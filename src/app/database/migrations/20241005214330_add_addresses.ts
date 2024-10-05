import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .withSchema('public')
    .schema.createTable('addresses')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('user_id', 'uuid', (col) =>
      col.references('users.user_id').onDelete('cascade'),
    )
    .addColumn('name', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('street', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('city', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('state', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('postal_code', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('country', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.withSchema('public').schema.dropTable('addresses').execute();
}
