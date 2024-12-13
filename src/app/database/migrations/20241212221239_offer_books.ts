import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .withSchema('public')
    .createTable('offer_books')
    .addColumn('offer_id', 'uuid', (col) => col.notNull())
    .addColumn('book_id', 'uuid', (col) => col.notNull())
    .addPrimaryKeyConstraint('offer_books_pkey', ['book_id', 'offer_id'])
    .addForeignKeyConstraint(
      'offer_books_book_id_fkey',
      ['book_id'],
      'books',
      ['id'],
      (constraint) => constraint.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'offer_books_offer_id_fkey',
      ['offer_id'],
      'offers',
      ['id'],
      (constraint) => constraint.onDelete('cascade'),
    )
    .addColumn('created_at', 'timestamptz', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.withSchema('public').dropTable('offer_books').execute();
}
