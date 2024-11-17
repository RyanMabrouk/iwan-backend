import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('price_dhs')
    .addColumn('price_dollar', 'numeric', (col) => col.notNull().defaultTo(0))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('price_dollar')
    .addColumn('price_dhs', 'numeric', (col) => col.notNull())
    .execute();
}
