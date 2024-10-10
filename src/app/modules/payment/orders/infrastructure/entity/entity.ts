import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { OrderProductEntity } from '../../modules/order_products/infrastructure/entity';
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from 'src/types/other/enums.types';

export interface KyselyOrderEntity {
  id: GeneratedAlways<string>;
  total_price: ColumnType<number, number, never>;
  delivery_price: ColumnType<number, number, never>;
  user_id: ColumnType<string, string, never>;
  status: ColumnType<
    PaymentStatusEnum,
    PaymentStatusEnum.PENDING,
    PaymentStatusEnum
  >;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  postal_code: string;
  payment_method: ColumnType<PaymentMethodEnum, PaymentMethodEnum, never>;
  cancel_reason: ColumnType<string | null, null, string>;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type OrderEntity = Selectable<KyselyOrderEntity>;
export interface IOrderPopulated extends OrderEntity {
  products: OrderProductEntity[];
}
export type NewOrder = Insertable<KyselyOrderEntity>;
export type UpdateOrder = Updateable<KyselyOrderEntity>;
export type IQueryOrderKeys = `orders.${keyof KyselyOrderEntity}`;
