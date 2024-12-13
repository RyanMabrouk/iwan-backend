import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db.schema
    .withSchema('public')
    .createTable('offers')
    .addColumn('id', 'uuid', (column) =>
      column.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('description', 'text', (column) => column.notNull())
    .addColumn('image_url', 'text', (col) => col.notNull())
    .addColumn('created_by', 'uuid', (col) =>
      col.notNull().references('users.user_id').onDelete('no action'),
    )
    .addColumn('price_before_offer', 'numeric', (col) =>
      col.notNull().check(sql`price_before_offer > 0`),
    )
    .addColumn('price_after_offer', 'numeric', (col) =>
      col.notNull().check(sql`price_after_offer > 0`),
    )
    .addColumn('created_at', 'timestamptz', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamptz', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.withSchema('public').dropTable('offers').execute();
}
