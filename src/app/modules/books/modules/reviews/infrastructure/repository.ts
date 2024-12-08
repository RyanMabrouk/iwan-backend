import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  ReviewEntity,
  KyselyReviewEntity,
  NewReview,
  UpdateReview,
  ReviewEntityPopulated,
  IQueryReviewKeys,
} from './entity';
import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { QueryReviewDto } from '../dto';

export class ReviewRepository
  implements GenericRepository<KyselyReviewEntity, UpdateReview, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(query: QueryReviewDto): Promise<ReviewEntityPopulated[]> {
    try {
      const res = await this.trx
        .selectFrom('reviews')
        .selectAll()
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IQueryReviewKeys[]).flatMap(
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
              (Object.keys(query.search ?? {}) as IQueryReviewKeys[]).flatMap(
                (key) =>
                  (query.search?.[key] ?? []).map((filter) =>
                    e(key, filter.operator, filter.value),
                  ),
              ),
            ),
          ),
        )
        .select((qb) => [
          jsonObjectFrom(
            qb
              .selectFrom('books')
              .selectAll()
              .whereRef('books.id', '=', 'reviews.book_id'),
          ).as('book'),
          jsonObjectFrom(
            qb
              .selectFrom('users')
              .selectAll()
              .whereRef('users.user_id', '=', 'reviews.user_id'),
          ).as('user'),
        ])
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateReview },
  ): Promise<ReviewEntity | null> {
    try {
      const res = await this.trx
        .updateTable('reviews')
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

  async deleteOne({ id }: { id: string }): Promise<ReviewEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('reviews')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewReview): Promise<ReviewEntity | null> {
    try {
      const res = await this.trx
        .insertInto('reviews')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
