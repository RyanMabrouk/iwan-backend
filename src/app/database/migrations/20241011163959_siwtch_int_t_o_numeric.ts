import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .alterColumn('price_after_discount', (col) => col.setDataType('numeric'))
    .alterColumn('price_dhs', (col) => col.setDataType('numeric'))
    .alterColumn('price', (col) => col.setDataType('numeric'))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .alterColumn('price_after_discount', (col) => col.setDataType('int8'))
    .alterColumn('price_dhs', (col) => col.setDataType('int8'))
    .alterColumn('price', (col) => col.setDataType('int8'))
    .execute();
}
