import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.createTable('events')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();

  await db
    .withSchema('public')
    .schema.createTable('event_books')
    .addColumn('event_id', 'uuid', (col) =>
      col.references('events.id').onDelete('cascade'),
    )
    .addColumn('book_id', 'uuid', (col) =>
      col.references('books.id').onDelete('cascade'),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('event_books').execute();
  await db.schema.dropTable('events').execute();
}
