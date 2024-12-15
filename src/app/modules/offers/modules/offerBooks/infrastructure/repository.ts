import { Inject } from '@nestjs/common';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { NewOfferBook, OfferBookEntity } from './entity';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';

export class OfferBookRepository {
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async createMany(payload: NewOfferBook[]): Promise<OfferBookEntity[]> {
    if (payload.length === 0) {
      return [];
    }
    try {
      const res = await this.trx
        .insertInto('offer_books')
        .values(payload)
        .returningAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async deleteMany(
    offer_id: string,
    book_ids: string[],
  ): Promise<OfferBookEntity[]> {
    if (book_ids.length === 0) {
      return [];
    }
    try {
      const res = await this.trx
        .deleteFrom('offer_books')
        .where('offer_id', '=', offer_id)
        .where('book_id', 'in', book_ids)
        .returningAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
