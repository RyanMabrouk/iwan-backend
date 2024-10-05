import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyShareHouseEntity {
  id: GeneratedAlways<string>;
  name: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type ShareHouseEntity = Selectable<KyselyShareHouseEntity>;
export type NewShareHouse = Insertable<KyselyShareHouseEntity>;
export type UpdateShareHouse = Updateable<KyselyShareHouseEntity>;
export type IQueryShareHouseKeys = `writers.${keyof KyselyShareHouseEntity}`;
