import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .withSchema('public')
    .alterTable('banners')
    .addColumn('phone_url', 'text', (column) => column.defaultTo(''))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.withSchema('public').dropTable('banners').execute();
}
