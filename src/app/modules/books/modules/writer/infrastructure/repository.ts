import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  WriterEntity,
  KyselyWriterEntity,
  NewWriter,
  UpdateWriter,
  QueryWriterDto,
  IWriterKeys,
} from './entity';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';

export class WriterRepository
  implements GenericRepository<KyselyWriterEntity, UpdateWriter, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<WriterEntity[]> {
    try {
      const res = await this.trx.selectFrom('writers').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findManyWithPagination(
    query: QueryWriterDto,
  ): Promise<InfinityPaginationResultType<WriterEntity>> {
    try {
      const queryBuilder = this.trx
        .selectFrom('writers')
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IWriterKeys[]).flatMap(
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
              (Object.keys(query.search ?? {}) as IWriterKeys[]).flatMap(
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

  async findOne({ id }: { id: string }): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .selectFrom('writers')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateWriter },
  ): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .updateTable('writers')
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

  async deleteOne({ id }: { id: string }): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('writers')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewWriter): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .insertInto('writers')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
