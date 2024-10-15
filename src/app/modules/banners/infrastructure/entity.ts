import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface KyselyBannerEntity {
  id: GeneratedAlways<string>;
  url: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type BannerEntity = Selectable<KyselyBannerEntity>;
export type NewBanner = Insertable<KyselyBannerEntity>;
export type UpdateBanner = Updateable<KyselyBannerEntity>;
