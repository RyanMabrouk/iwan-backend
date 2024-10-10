import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .withSchema('public')
    .schema.createTable('wishlists')
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().references('users.user_id').onDelete('cascade'),
    )
    .addColumn('book_id', 'uuid', (col) =>
      col.notNull().references('books.id').onDelete('cascade'),
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addPrimaryKeyConstraint('wishlists _pkey', ['user_id', 'book_id'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('wishlists').execute();
}
