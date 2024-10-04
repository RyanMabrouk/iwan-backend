import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  SubcategoryEntity,
  KyselySubcategoryEntity,
  NewSubcategory,
  UpdateSubcategory,
} from './entity';

export class SubcategoryRepository
  implements
    GenericRepository<KyselySubcategoryEntity, UpdateSubcategory, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<SubcategoryEntity[]> {
    try {
      const res = await this.trx
        .selectFrom('subcategories')
        .selectAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateSubcategory },
  ): Promise<SubcategoryEntity | null> {
    try {
      const res = await this.trx
        .updateTable('subcategories')
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

  async deleteOne({ id }: { id: string }): Promise<SubcategoryEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('subcategories')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewSubcategory): Promise<SubcategoryEntity | null> {
    try {
      const res = await this.trx
        .insertInto('subcategories')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
