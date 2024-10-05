import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  ShareHouseEntity,
  KyselyShareHouseEntity,
  NewShareHouse,
  UpdateShareHouse,
} from './entity';

export class ShareHouseRepository
  implements GenericRepository<KyselyShareHouseEntity, UpdateShareHouse, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<ShareHouseEntity[]> {
    try {
      const res = await this.trx
        .selectFrom('share_houses')
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
    } & { payload: UpdateShareHouse },
  ): Promise<ShareHouseEntity | null> {
    try {
      const res = await this.trx
        .updateTable('share_houses')
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

  async deleteOne({ id }: { id: string }): Promise<ShareHouseEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('share_houses')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewShareHouse): Promise<ShareHouseEntity | null> {
    try {
      const res = await this.trx
        .insertInto('share_houses')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
