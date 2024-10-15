import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.createTable('banners')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('url', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('banners').execute();
}
