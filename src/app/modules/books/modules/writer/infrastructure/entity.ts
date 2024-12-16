import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { QueryDtoWithPagination } from 'src/app/shared/dto/QueryDtoWithPagination.dto';

export interface KyselyWriterEntity {
  id: GeneratedAlways<string>;
  name: string;
  nationality: string | null;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type WriterEntity = Selectable<KyselyWriterEntity>;
export type NewWriter = Insertable<KyselyWriterEntity>;
export type UpdateWriter = Updateable<KyselyWriterEntity>;

export type IWriterKeys = `writers.${keyof KyselyWriterEntity}`;
export class QueryWriterDto extends QueryDtoWithPagination<IWriterKeys> {}
