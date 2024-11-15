import { Inject } from '@nestjs/common';
import { UpdateOrderDto } from '../../dto/update.dto';
import { QueryOrderDto } from '../../dto/query.dto';
import {
  OrderEntity,
  IQueryOrderKeys,
  KyselyOrderEntity,
  IOrderPopulated,
  NewOrder,
  UpdateOrder,
} from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { PaymentStatusEnum } from 'src/types/other/enums.types';

export class OrderRepository
  implements
    GenericRepository<KyselyOrderEntity, UpdateOrderDto, QueryOrderDto>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({ id }: { id: string }): Promise<IOrderPopulated | null> {
    try {
      const res = await this.trx
        .selectFrom('orders')
        .where('id', '=', id)
        .selectAll()
        .select((q) => [
          jsonArrayFrom(
            q
              .selectFrom('orders_products')
              .whereRef(`orders_products.order_id`, '=', `orders.id`)
              .innerJoin('books', 'orders_products.book_id', 'books.id')
              .selectAll(),
          ).as('products'),
        ])
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findManyWithPagination(
    query: QueryOrderDto,
  ): Promise<InfinityPaginationResultType<IOrderPopulated>> {
    try {
      const queryBuilder = this.trx
        .selectFrom('orders')
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IQueryOrderKeys[]).flatMap(
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
              (Object.keys(query.search ?? {}) as IQueryOrderKeys[]).flatMap(
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
                .selectFrom('orders_products')
                .whereRef(`orders_products.order_id`, '=', `orders.id`)
                .innerJoin('books', 'orders_products.book_id', 'books.id')
                .selectAll(),
            ).as('products'),
          ])
          .execute(),
        queryBuilder
          .select(this.trx.fn.countAll().as('count'))
          .executeTakeFirst(),
      ]);
      return infinityPagination(res, {
        total_count: Number(total?.count ?? 0),
        page: query.page,
        limit: query.limit,
      });
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewOrder): Promise<OrderEntity | null> {
    try {
      const res = await this.trx
        .insertInto('orders')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async changeStatus({
    id,
    status,
    cancel_reason,
  }: {
    id: string;
    status: PaymentStatusEnum;
    cancel_reason?: string;
  }): Promise<OrderEntity | null> {
    try {
      const payload = cancel_reason ? { status, cancel_reason } : { status };
      const res = await this.trx
        .updateTable('orders')
        .set({
          ...payload,
          updated_at: new Date(),
        })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateOrder },
  ): Promise<OrderEntity | null> {
    try {
      const res = await this.trx
        .updateTable('orders')
        .set({
          ...args.payload,
          updated_at: new Date(),
        })
        .where('id', '=', args.id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async deleteOne({ id }: { id: string }): Promise<OrderEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('orders')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
