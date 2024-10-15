import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  CornerEntity,
  KyselyCornerEntity,
  NewCorner,
  UpdateCorner,
} from './entity';

export class CornerRepository
  implements GenericRepository<KyselyCornerEntity, UpdateCorner, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<CornerEntity[]> {
    try {
      const res = await this.trx.selectFrom('corners').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateCorner },
  ): Promise<CornerEntity | null> {
    try {
      const res = await this.trx
        .updateTable('corners')
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

  async deleteOne({ id }: { id: string }): Promise<CornerEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('corners')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewCorner): Promise<CornerEntity | null> {
    try {
      const res = await this.trx
        .insertInto('corners')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
