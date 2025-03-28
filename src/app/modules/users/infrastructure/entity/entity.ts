import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { RolesEnum } from 'src/types/other/enums.types';

export interface KyselyUserEntity {
  user_id: ColumnType<string, string, never>;
  roles: RolesEnum[];
  avatar: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  street: string;
  street2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type UserEntity = Selectable<KyselyUserEntity>;
export interface UserPopulated extends UserEntity {
  total_spent: number;
}
export type NewUser = Insertable<KyselyUserEntity>;
export type UpdateUser = Updateable<KyselyUserEntity>;
export type IQueryUserKeys = `users.${keyof KyselyUserEntity}`;
