import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .addColumn('images_urls', sql`text[]`, (col) =>
      col.notNull().defaultTo('{}'),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('images_urls')
    .execute();
}
