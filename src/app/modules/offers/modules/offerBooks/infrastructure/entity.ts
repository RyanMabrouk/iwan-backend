import { GeneratedAlways, Insertable, Selectable } from 'kysely';

export interface KyselyOfferBooksEntity {
  book_id: string;
  offer_id: string;
  created_at: GeneratedAlways<Date>;
}

export type OfferBookEntity = Selectable<KyselyOfferBooksEntity>;
export type NewOfferBook = Insertable<KyselyOfferBooksEntity>;
