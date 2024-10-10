import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import {
  OrderProductEntity,
  KyselyOrderProductEntity,
  NewOrderProduct,
} from './entity';

export class OrderProductRepository
  implements GenericRepository<KyselyOrderProductEntity, never, never>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  async findMany(): Promise<OrderProductEntity[]> {
    try {
      const res = await this.trx
        .selectFrom('orders_products')
        .selectAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async deleteMany({
    order_id,
  }: {
    order_id: string;
  }): Promise<OrderProductEntity[]> {
    try {
      const res = await this.trx
        .deleteFrom('orders_products')
        .where('order_id', '=', order_id)
        .returningAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createMany(payload: NewOrderProduct[]): Promise<OrderProductEntity[]> {
    try {
      const res = await this.trx
        .insertInto('orders_products')
        .values(payload)
        .returningAll()
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
