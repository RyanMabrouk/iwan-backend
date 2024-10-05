import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselySubcategoryEntity {
  id: GeneratedAlways<string>;
  name: string;
  category_id: ColumnType<string, string, never>;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type SubcategoryEntity = Selectable<KyselySubcategoryEntity>;
export type NewSubcategory = Insertable<KyselySubcategoryEntity>;
export type UpdateSubcategory = Updateable<KyselySubcategoryEntity>;
