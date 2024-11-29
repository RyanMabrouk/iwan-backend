import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { WishlistEntity, KyselyWishlistEntity, NewWishlist } from './entity';
import {
  BookEntity,
  IQueryBookKeys,
} from 'src/app/modules/books/infrastructure/entity/entity';
import { QueryBookDto } from 'src/app/modules/books/dto/query.dto';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

export class WishlistRepository
  implements GenericRepository<KyselyWishlistEntity, never, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findManyBooksWithPagination(
    query: QueryBookDto,
    user_id: string,
  ): Promise<InfinityPaginationResultType<BookEntity>> {
    try {
      const queryBuilder = this.trx
        .selectFrom('wishlists')
        .where('wishlists.user_id', '=', user_id)
        .innerJoin('books', 'books.id', 'wishlists.book_id')
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IQueryBookKeys[]).flatMap(
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
              (Object.keys(query.search ?? {}) as IQueryBookKeys[]).flatMap(
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
          .selectAll(['books'])
          .select((q) => [
            jsonObjectFrom(
              q
                .selectFrom('writers')
                .whereRef(`writers.id`, '=', `books.writer_id`)
                .selectAll(),
            ).as('writer'),
          ])
          .execute(),
        queryBuilder
          .select(this.trx.fn.countAll().as('count'))
          .executeTakeFirst(),
      ]);
      return infinityPagination(
        res.map((book) => ({
          ...book,
          is_in_wishlist: true,
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

  async deleteOne({
    user_id,
    book_id,
  }: {
    user_id: string;
    book_id: string;
  }): Promise<WishlistEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('wishlists')
        .where('user_id', '=', user_id)
        .where('book_id', '=', book_id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewWishlist): Promise<WishlistEntity | null> {
    try {
      const res = await this.trx
        .insertInto('wishlists')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
