import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  AddressEntity,
  KyselyAddressEntity,
  NewAddress,
  UpdateAddress,
} from './entity';

export class AddressRepository
  implements GenericRepository<KyselyAddressEntity, UpdateAddress, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<AddressEntity[]> {
    try {
      const res = await this.trx.selectFrom('addresses').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateAddress },
  ): Promise<AddressEntity | null> {
    try {
      const res = await this.trx
        .updateTable('addresses')
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

  async deleteOne({ id }: { id: string }): Promise<AddressEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('addresses')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewAddress): Promise<AddressEntity | null> {
    try {
      const res = await this.trx
        .insertInto('addresses')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
