import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.createTable('corners')
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
    .schema.alterTable('books')
    .addColumn('corner_id', 'uuid', (col) => col.references('corners.id'))
    .addColumn('number_of_volumes', 'numeric', (col) =>
      col.defaultTo(0).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('banners').execute();
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .dropColumn('corner_id')
    .dropColumn('number_of_volumes')
    .execute();
}
