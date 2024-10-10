import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { DiscountTypeEnum } from 'src/types/other/enums.types';

export interface KyselyOrderProductEntity {
  id: GeneratedAlways<string>;
  book_id: string; // This is a foreign key
  quantity: number;
  price_before_discount: number;
  discount: number;
  discount_type: DiscountTypeEnum;
  order_id: string; // This is a foreign key
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type OrderProductEntity = Selectable<KyselyOrderProductEntity>;
export type NewOrderProduct = Insertable<KyselyOrderProductEntity>;
export type UpdateOrderProduct = Updateable<KyselyOrderProductEntity>;
