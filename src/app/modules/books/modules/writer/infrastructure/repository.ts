import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  WriterEntity,
  KyselyWriterEntity,
  NewWriter,
  UpdateWriter,
} from './entity';

export class WriterRepository
  implements GenericRepository<KyselyWriterEntity, UpdateWriter, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<WriterEntity[]> {
    try {
      const res = await this.trx.selectFrom('writers').selectAll().execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateWriter },
  ): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .updateTable('writers')
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

  async deleteOne({ id }: { id: string }): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('writers')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewWriter): Promise<WriterEntity | null> {
    try {
      const res = await this.trx
        .insertInto('writers')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
