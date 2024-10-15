import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('banners')
    .addColumn('book_id', 'uuid', (col) =>
      col.references('books.id').onDelete('cascade').notNull(),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('banners')
    .dropColumn('book_id')
    .execute();
}
