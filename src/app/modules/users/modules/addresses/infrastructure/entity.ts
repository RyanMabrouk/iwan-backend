import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyAddressEntity {
  id: GeneratedAlways<string>;
  user_id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type AddressEntity = Selectable<KyselyAddressEntity>;
export type NewAddress = Insertable<KyselyAddressEntity>;
export type UpdateAddress = Updateable<KyselyAddressEntity>;
