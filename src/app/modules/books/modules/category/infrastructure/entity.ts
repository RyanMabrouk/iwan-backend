import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyCategoryEntity {
  id: GeneratedAlways<string>;
  name: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type CategoryEntity = Selectable<KyselyCategoryEntity>;
export type NewCategory = Insertable<KyselyCategoryEntity>;
export type UpdateCategory = Updateable<KyselyCategoryEntity>;
