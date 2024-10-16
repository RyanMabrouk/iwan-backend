import { Insertable, Selectable, Updateable } from 'kysely';

export interface KyselyEventBooksEntity {
  book_id: string;
  event_id: string;
}

export type EventBooksEntity = Selectable<KyselyEventBooksEntity>;
export type NewEventBooks = Insertable<KyselyEventBooksEntity>;
export type UpdateEventBooks = Updateable<KyselyEventBooksEntity>;
export type IQueryEventBooksKeys =
  `event_books.${keyof KyselyEventBooksEntity}`;
