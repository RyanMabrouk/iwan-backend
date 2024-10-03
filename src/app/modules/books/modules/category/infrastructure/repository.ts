import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  CategoryEntity,
  KyselyCategoryEntity,
  NewCategory,
  UpdateCategory,
} from './entity';

export class CategoryRepository
  implements GenericRepository<KyselyCategoryEntity, UpdateCategory, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<CategoryEntity[]> {
    try {
      const res = await this.trx.selectFrom('categories').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateCategory },
  ): Promise<CategoryEntity | null> {
    try {
      const res = await this.trx
        .updateTable('categories')
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

  async deleteOne({ id }: { id: string }): Promise<CategoryEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('categories')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewCategory): Promise<CategoryEntity | null> {
    try {
      const res = await this.trx
        .insertInto('categories')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
