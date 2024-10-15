import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyCornerEntity {
  id: GeneratedAlways<string>;
  name: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type CornerEntity = Selectable<KyselyCornerEntity>;
export type NewCorner = Insertable<KyselyCornerEntity>;
export type UpdateCorner = Updateable<KyselyCornerEntity>;
