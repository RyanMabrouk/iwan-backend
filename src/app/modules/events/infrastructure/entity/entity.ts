import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { BookEntity } from 'src/app/modules/books/infrastructure/entity/entity';

export interface KyselyEventEntity {
  id: GeneratedAlways<string>;
  name: string;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type EventEntity = Selectable<KyselyEventEntity>;
export interface IEventPopulated extends EventEntity {
  books: BookEntity[];
}
export type NewEvent = Insertable<KyselyEventEntity>;
export type UpdateEvent = Updateable<KyselyEventEntity>;
export type IQueryEventKeys = `events.${keyof KyselyEventEntity}`;
