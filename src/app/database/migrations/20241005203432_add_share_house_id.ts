import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('share_house')
    .addColumn('share_house_id', 'uuid', (col) =>
      col.references('share_houses.id').onDelete('cascade'),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('share_house_id')
    .addColumn('share_house', 'text', (col) => col.defaultTo('').notNull())
    .execute();
}
