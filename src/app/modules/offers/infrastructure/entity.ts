import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { BookEntity } from '../../books/infrastructure/entity/entity';

export interface KyselyOffersEntity {
  id: GeneratedAlways<string>;
  title: string;
  description: string | null;
  image_url: string;
  created_by?: string;
  price_before_offer: number;
  price_after_offer: number;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type OfferEntity = Selectable<KyselyOffersEntity>;
export type NewOffer = Insertable<KyselyOffersEntity>;
export type UpdateOffer = Updateable<KyselyOffersEntity>;
export type IQueryOfferKeys = `offers.${keyof KyselyOffersEntity}`;

export type OfferDetails = OfferEntity & {
  books: BookEntity[];
};
