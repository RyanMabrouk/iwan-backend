import { Inject } from '@nestjs/common';
import { UpdateBookDto } from '../../dto/update.dto';
import { QueryBookDto } from '../../dto/query.dto';
import {
  BookEntity,
  IQueryBookKeys,
  KyselyBookEntity,
  NewBook,
  IBookPopulated,
} from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { infinityPagination } from 'src/app/shared/utils/infinityPagination';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { NewBookCategory } from '../entity/bookCategories';
import { NewBookSubcategory } from '../entity/bookSubcategories';

export class BookRepository
  implements GenericRepository<KyselyBookEntity, UpdateBookDto, QueryBookDto>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({ id }: { id: string }): Promise<IBookPopulated | null> {
    try {
      const res = await this.trx
        .selectFrom('books')
        .where('id', '=', id)
        .selectAll()
        .select((q) => [
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
        ])
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findManyWithPagination(
    query: QueryBookDto,
  ): Promise<InfinityPaginationResultType<IBookPopulated>> {
    try {
      const queryBuilder = this.trx
        .selectFrom('books')
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
          .selectAll()
          .select((q) => [
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

  async addCategoryToBook(payload: NewBookCategory) {
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

  async addSubcategoryToBook(payload: NewBookSubcategory) {
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
