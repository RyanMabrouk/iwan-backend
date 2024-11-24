import { Inject } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/update.dto';
import { QueryUserDto } from '../../dto/query.dto';
import {
  UserEntity,
  IQueryUserKeys,
  KyselyUserEntity,
  UserPopulated,
} from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export class UserRepository
  implements GenericRepository<KyselyUserEntity, UpdateUserDto, QueryUserDto>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({
    user_id,
  }: {
    user_id: string;
  }): Promise<UserPopulated | null> {
    try {
      const res = await this.trx
        .selectFrom('users')
        .innerJoin('orders', 'orders.user_id', 'users.user_id')
        .where('users.user_id', '=', user_id)
        .selectAll()
        .select((q) => [
          jsonArrayFrom(
            q
              .selectFrom('addresses')
              .where(`addresses.user_id`, '=', user_id)
              .selectAll(),
          ).as('addresses'),
          q.fn
            .sum('orders.total_price')
            .filterWhere('orders.user_id', '=', user_id)
            .as('total_spent'),
        ])
        .executeTakeFirst();
      if (!res) return null;
      return {
        ...res,
        total_spent: Number(res.total_spent ?? 0),
      };
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findManyWithPagination(
    query: QueryUserDto,
  ): Promise<InfinityPaginationResultType<UserPopulated>> {
    try {
      const queryBuilder = this.trx
        .selectFrom('users')
        .innerJoin('orders', 'orders.user_id', 'users.user_id')
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IQueryUserKeys[]).flatMap(
                (key) =>
                  (query.filters?.[key] ?? []).map((filter) =>
                    e(key, filter.operator, filter.value),
                  ),
              ),
            ),
          ),
        )
        .$if(!!query.search, (q) =>
          q.where((e) =>
            e.or(
              (Object.keys(query.search ?? {}) as IQueryUserKeys[]).flatMap(
                (key) =>
                  (query.search?.[key] ?? []).map((filter) =>
                    e(key, filter.operator, filter.value),
                  ),
              ),
            ),
          ),
        );
      const [res, total] = await Promise.all([
        queryBuilder
          .$if(!!query.sort, (q) =>
            q.orderBy(query.sort!.orderBy, query.sort?.order),
          )
          .$if(!!query.limit, (q) => q.limit(query.limit))
          .$if(!!query.limit && !!query.page, (q) =>
            q.offset((query.page - 1) * query.limit),
          )
          .selectAll()
          .select((q) => [
            jsonArrayFrom(
              q
                .selectFrom('addresses')
                .whereRef(`addresses.user_id`, '=', `users.user_id`)
                .selectAll(),
            ).as('addresses'),
            q.fn
              .sum('orders.total_price')
              .filterWhereRef('orders.user_id', '=', 'users.user_id')
              .as('total_spent'),
          ])
          .execute(),
        queryBuilder
          .select(this.trx.fn.countAll('users').as('count'))
          .executeTakeFirst(),
      ]);
      return infinityPagination(
        res.map((user) => ({
          ...user,
          total_spent: Number(user.total_spent ?? 0),
        })),
        {
          total_count: Number(total?.count ?? 0),
          page: query.page,
          limit: query.limit,
        },
      );
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      user_id: string;
    } & { payload: UpdateUserDto },
  ): Promise<UserEntity | null> {
    try {
      const res = await this.trx
        .updateTable('users')
        .set({
          ...args.payload,
          updated_at: new Date(),
        })
        .where('user_id', '=', args.user_id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
