import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  BannerEntity,
  KyselyBannerEntity,
  NewBanner,
  UpdateBanner,
} from './entity';

export class BannerRepository
  implements GenericRepository<KyselyBannerEntity, UpdateBanner, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findOne({ id }: { id: string }): Promise<BannerEntity | null> {
    try {
      const res = await this.trx
        .selectFrom('banners')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findMany(): Promise<BannerEntity[]> {
    try {
      const res = await this.trx.selectFrom('banners').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateBanner },
  ): Promise<BannerEntity | null> {
    try {
      const res = await this.trx
        .updateTable('banners')
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

  async deleteOne({ id }: { id: string }): Promise<BannerEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('banners')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewBanner): Promise<BannerEntity | null> {
    try {
      const res = await this.trx
        .insertInto('banners')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
