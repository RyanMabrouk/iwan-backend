import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyCoverTypeEntity {
  id: GeneratedAlways<string>;
  name: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type CoverTypeEntity = Selectable<KyselyCoverTypeEntity>;
export type NewCoverType = Insertable<KyselyCoverTypeEntity>;
export type UpdateCoverType = Updateable<KyselyCoverTypeEntity>;
