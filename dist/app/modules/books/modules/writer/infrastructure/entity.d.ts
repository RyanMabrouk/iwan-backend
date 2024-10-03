import { ColumnType, GeneratedAlways, Insertable, Selectable, Updateable } from 'kysely';
export interface KyselyWriterEntity {
    id: GeneratedAlways<string>;
    name: string;
    created_at: GeneratedAlways<Date>;
    updated_at: ColumnType<Date, never, Date>;
}
export type WriterEntity = Selectable<KyselyWriterEntity>;
export type NewWriter = Insertable<KyselyWriterEntity>;
export type UpdateWriter = Updateable<KyselyWriterEntity>;
export type IQueryWriterKeys = `writers.${keyof KyselyWriterEntity}`;
