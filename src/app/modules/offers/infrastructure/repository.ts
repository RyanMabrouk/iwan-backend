import { Inject } from '@nestjs/common';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { IQueryOfferKeys, NewOffer, OfferEntity } from './entity';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { UpdateOfferDto } from '../dto/update.dto';
import { QueryOfferDto } from '../dto/query.dto';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export class OfferRepository {
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({ id }: { id: string }): Promise<any | null> {
    try {
      const res = await this.trx
        .selectFrom('offers')
        .selectAll('offers')
        .select((eb) =>
          jsonArrayFrom(
            eb
              .selectFrom('offer_books')
              .innerJoin('books', 'books.id', 'offer_books.book_id')
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
              ])
              .whereRef('offer_books.offer_id', '=', 'offers.id'),
          ).as('books'),
        )
        .where('offers.id', '=', id)
        .executeTakeFirst();
      if (!res) return null;
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findMany(query: QueryOfferDto): Promise<OfferEntity[]> {
    try {
      const queryBuilder = this.trx
        .selectFrom('offers')
        .$if(!!query.filters, (q) =>
          q.where((e) =>
            e.and(
              (Object.keys(query.filters ?? {}) as IQueryOfferKeys[]).flatMap(
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
              (Object.keys(query.search ?? {}) as IQueryOfferKeys[]).flatMap(
                (key) =>
                  (query.search?.[key] ?? []).map((filter) =>
                    e(key, filter.operator, filter.value),
                  ),
              ),
            ),
          ),
        );
      return queryBuilder.selectAll().execute();
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateOfferDto },
  ): Promise<OfferEntity | null> {
    try {
      const res = await this.trx
        .updateTable('offers')
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

  async deleteOne({ id }: { id: string }): Promise<OfferEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('offers')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewOffer): Promise<OfferEntity | null> {
    try {
      const res = await this.trx
        .insertInto('offers')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
