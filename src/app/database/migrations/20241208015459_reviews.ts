import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .withSchema('public')
    .createTable('reviews')
    .addColumn('id', 'uuid', (column) =>
      column.primaryKey().defaultTo(sql`uuid_generate_v4()`),
    )
    .addColumn('rating', 'integer', (column) => column.notNull())
    .addColumn('content', 'text', (column) => column.notNull())
    .addColumn('book_id', 'uuid', (column) =>
      column.notNull().references('books.id').onDelete('cascade'),
    )
    .addColumn('user_id', 'uuid', (column) =>
      column.notNull().references('users.user_id').onDelete('cascade'),
    )
    .addColumn('created_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamp', (column) =>
      column.notNull().defaultTo(sql`now()`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.withSchema('public').dropTable('reviews').execute();
}
