import { Inject } from '@nestjs/common';
import { UpdateBookDto } from '../../dto/update.dto';
import { QueryBookDto } from '../../dto/query.dto';
import {
  BookEntity,
  IQueryBookKeys,
  NewBook,
  IBookPopulated,
  IBookDetails,
} from '../entity/entity';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { NewBookCategory } from '../entity/bookCategories';
import { NewBookSubcategory } from '../entity/bookSubcategories';
import { omit } from 'src/app/shared/utils/omit';

export class BookRepository {
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({
    id,
    user_id,
  }: {
    id: string;
    user_id?: string;
  }): Promise<IBookDetails | null> {
    try {
      const res = await this.trx
        .with('this_book', (q) =>
          q.selectFrom('books').where('id', '=', id).selectAll('books'),
        )
        .with('this_book_categories', (q) =>
          q
            .selectFrom('book_categories')
            .where(`book_categories.book_id`, '=', id)
            .innerJoin(
              'categories',
              'categories.id',
              'book_categories.category_id',
            )
            .selectAll('categories'),
        )
        .selectFrom('this_book')
        .selectAll('this_book')
        .select((q) => [
          user_id
            ? jsonArrayFrom(
                q
                  .selectFrom('wishlists')
                  .where('wishlists.user_id', '=', user_id)
                  .where('wishlists.book_id', '=', id)
                  .select('wishlists.book_id'),
              ).as('wishlist')
            : 'this_book.id', // this is so typescript doesn't complain
          jsonArrayFrom(
            q
              .selectFrom('books')
              .whereRef(`books.writer_id`, '=', `this_book.writer_id`)
              .where(`books.writer_id`, 'is not', null)
              .limit(8)
              .select([
                'books.id',
                'books.title',
                'books.slug',
                'books.images_urls',
                'books.price',
                'books.price_after_discount',
                'books.discount',
                'books.discount_type',
                'books.price_dollar',
              ]),
          ).as('writer_books'),
          jsonArrayFrom(
            q
              .selectFrom('books')
              .innerJoin(
                'book_categories',
                'book_categories.book_id',
                'books.id',
              )
              .innerJoin(
                'this_book_categories',
                'this_book_categories.id',
                'book_categories.category_id',
              )
              .limit(8)
              .select((qb) => [
                'books.id',
                'books.title',
                'books.slug',
                'books.images_urls',
                'books.price',
                'books.price_after_discount',
                'books.discount',
                'books.discount_type',
                'books.price_dollar',
                jsonObjectFrom(
                  qb
                    .selectFrom('writers')
                    .whereRef(`writers.id`, '=', `books.writer_id`)
                    .selectAll(),
                ).as('writer'),
                user_id
                  ? jsonArrayFrom(
                      qb
                        .selectFrom('wishlists')
                        .where('wishlists.user_id', '=', user_id)
                        .whereRef('wishlists.book_id', '=', 'books.id')
                        .select('wishlists.book_id'),
                    ).as('wishlist')
                  : 'this_book.id',
              ]),
          ).as('recommended_books'),
          jsonArrayFrom(
            q
              .selectFrom('this_book_categories')
              .selectAll('this_book_categories'),
          ).as('categories'),
          jsonArrayFrom(
            q
              .selectFrom('book_subcategories')
              .where(`book_subcategories.book_id`, '=', id)
              .innerJoin(
                'subcategories',
                'subcategories.id',
                'book_subcategories.subcategory_id',
              )
              .selectAll('subcategories'),
          ).as('subcategories'),
          jsonObjectFrom(
            q
              .selectFrom('cover_types')
              .whereRef(`cover_types.id`, '=', `this_book.cover_type_id`)
              .selectAll(),
          ).as('cover_type'),
          jsonObjectFrom(
            q
              .selectFrom('writers')
              .whereRef(`writers.id`, '=', `this_book.writer_id`)
              .selectAll(),
          ).as('writer'),
          jsonObjectFrom(
            q
              .selectFrom('share_houses')
              .whereRef(`share_houses.id`, '=', `this_book.share_house_id`)
              .selectAll(),
          ).as('share_house'),
          jsonObjectFrom(
            q
              .selectFrom('corners')
              .whereRef(`corners.id`, '=', `this_book.corner_id`)
              .selectAll(),
          ).as('corner'),
          jsonObjectFrom(
            q
              .selectFrom('reviews')
              .where('reviews.book_id', '=', id)
              .select((qb) => [
                qb.fn
                  .sum('reviews.rating')
                  .filterWhere('reviews.book_id', '=', id)
                  .as('total_reviews_rating'),
                qb.fn
                  .count('reviews.id')
                  .filterWhere('reviews.book_id', '=', id)
                  .as('total_reviews_count'),
              ]),
          ).as('reviews_stats'),
        ])
        .executeTakeFirst();
      if (!res) return null;
      return {
        ...omit(res, ['wishlist', 'reviews_stats']),
        recommended_books: res.recommended_books.map((book) => ({
          ...omit(book, ['wishlist']),
          is_in_wishlist:
            typeof book.wishlist === 'object' && book.wishlist?.length > 0
              ? true
              : false,
        })),
        is_in_wishlist: Array.isArray(res.wishlist) && res.wishlist.length > 0,
        total_rating:
          Number(res.reviews_stats?.total_reviews_rating ?? 0) /
          (Number(res.reviews_stats?.total_reviews_count ?? 1) || 1),
        total_reviews_count: Number(
          res.reviews_stats?.total_reviews_count ?? 0,
        ),
      };
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findManyWithPagination(
    query: QueryBookDto,
    user_id?: string,
  ): Promise<InfinityPaginationResultType<IBookPopulated>> {
    try {
      const queryBuilder = this.trx
        .selectFrom(['books'])
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
        )
        .$if(!!query.extra_filters?.most_sold, (q) =>
          q
            .innerJoin('orders_products', 'orders_products.book_id', 'books.id')
            .groupBy(['books.id'])
            .orderBy(
              this.trx.fn
                .sum('orders_products.quantity')
                .filterWhereRef('orders_products.book_id', '=', 'books.id'),
              query.extra_filters?.most_sold,
            ),
        )
        .$if(!!query.extra_filters?.categories_ids, (q) =>
          q
            .innerJoin('book_categories', 'book_categories.book_id', 'books.id')
            .where(
              'book_categories.category_id',
              'in',
              query.extra_filters?.categories_ids as string[],
            ),
        )
        .$if(!!query.extra_filters?.subcategories_ids, (q) =>
          q
            .innerJoin(
              'book_subcategories',
              'book_subcategories.book_id',
              'books.id',
            )
            .where(
              'book_subcategories.subcategory_id',
              'in',
              query.extra_filters?.subcategories_ids as string[],
            ),
        )
        .$if(!!query.extra_filters?.writer_nationality, (q) =>
          q
            .innerJoin('writers', 'writers.id', 'books.writer_id')
            .where(
              'writers.nationality',
              '=',
              query.extra_filters?.writer_nationality as string,
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
          .selectAll('books')
          .select((q) => [
            user_id
              ? jsonArrayFrom(
                  q
                    .selectFrom('wishlists')
                    .where('wishlists.user_id', '=', user_id)
                    .whereRef('wishlists.book_id', '=', 'books.id')
                    .select('wishlists.book_id'),
                ).as('wishlist')
              : 'books.id', // this is so typescript doesn't complain
            jsonArrayFrom(
              q
                .selectFrom('book_categories')
                .whereRef(`book_categories.book_id`, '=', `books.id`)
                .innerJoin(
                  'categories',
                  'categories.id',
                  'book_categories.category_id',
                )
                .selectAll('categories'),
            ).as('categories'),
            jsonArrayFrom(
              q
                .selectFrom('book_subcategories')
                .whereRef(`book_subcategories.book_id`, '=', `books.id`)
                .innerJoin(
                  'subcategories',
                  'subcategories.id',
                  'book_subcategories.subcategory_id',
                )
                .selectAll('subcategories'),
            ).as('subcategories'),
            jsonObjectFrom(
              q
                .selectFrom('cover_types')
                .whereRef(`cover_types.id`, '=', `books.cover_type_id`)
                .selectAll(),
            ).as('cover_type'),
            jsonObjectFrom(
              q
                .selectFrom('writers')
                .whereRef(`writers.id`, '=', `books.writer_id`)
                .selectAll(),
            ).as('writer'),
            jsonObjectFrom(
              q
                .selectFrom('share_houses')
                .whereRef(`share_houses.id`, '=', `books.share_house_id`)
                .selectAll(),
            ).as('share_house'),
            jsonObjectFrom(
              q
                .selectFrom('corners')
                .whereRef(`corners.id`, '=', `books.corner_id`)
                .selectAll(),
            ).as('corner'),
            jsonObjectFrom(
              q
                .selectFrom('reviews')
                .whereRef('reviews.book_id', '=', 'books.id')
                .select((qb) => [
                  qb.fn
                    .sum('reviews.rating')
                    .filterWhereRef('reviews.book_id', '=', 'books.id')
                    .as('total_reviews_rating'),
                  qb.fn
                    .count('reviews.id')
                    .filterWhereRef('reviews.book_id', '=', 'books.id')
                    .as('total_reviews_count'),
                ]),
            ).as('reviews_stats'),
          ])
          .execute(),
        queryBuilder
          .select(this.trx.fn.countAll().as('count'))
          .executeTakeFirst(),
      ]);
      return infinityPagination(
        res.map((book) => ({
          ...omit(book, ['wishlist', 'reviews_stats']),
          is_in_wishlist:
            Array.isArray(book.wishlist) && book.wishlist.length > 0,
          total_rating:
            Number(book.reviews_stats?.total_reviews_rating ?? 0) /
            (Number(book.reviews_stats?.total_reviews_count ?? 1) || 1),

          total_reviews_count: Number(
            book.reviews_stats?.total_reviews_count ?? 0,
          ),
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
      id: string;
    } & { payload: UpdateBookDto },
  ): Promise<BookEntity | null> {
    try {
      const res = await this.trx
        .updateTable('books')
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

  async deleteOne({ id }: { id: string }): Promise<BookEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('books')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewBook): Promise<BookEntity | null> {
    try {
      const res = await this.trx
        .insertInto('books')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async addCategoryToBook(payload: NewBookCategory[]) {
    try {
      const res = await this.trx
        .insertInto('book_categories')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async addSubcategoryToBook(payload: NewBookSubcategory[]) {
    try {
      const res = await this.trx
        .insertInto('book_subcategories')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
  async removeCategoryFromBook({
    book_id,
    category_id,
  }: {
    book_id: string;
    category_id: string;
  }) {
    try {
      const res = await this.trx
        .deleteFrom('book_categories')
        .where('book_id', '=', book_id)
        .where('category_id', '=', category_id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async removeSubcategoryFromBook({
    book_id,
    subcategory_id,
  }: {
    book_id: string;
    subcategory_id: string;
  }) {
    try {
      const res = await this.trx
        .deleteFrom('book_subcategories')
        .where('book_id', '=', book_id)
        .where('subcategory_id', '=', subcategory_id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
