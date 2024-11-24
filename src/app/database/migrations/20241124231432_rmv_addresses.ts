import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('users')
    .addColumn('street', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('street2', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('city', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('state', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('postal_code', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('country', 'text', (col) => col.notNull().defaultTo(''))
    .execute();

  await db.withSchema('public').schema.dropTable('addresses').execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('users')
    .dropColumn('street')
    .dropColumn('street2')
    .dropColumn('city')
    .dropColumn('state')
    .dropColumn('postal_code')
    .dropColumn('country')
    .execute();

  await db
    .withSchema('public')
    .schema.createTable('addresses')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().references('users.id').onDelete('cascade'),
    )
    .addColumn('street', 'text', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('city', 'text', (col) => col.notNull())
    .addColumn('state', 'text', (col) => col.notNull())
    .addColumn('postal_code', 'text', (col) => col.notNull())
    .addColumn('country', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`now()`),
    )
    .execute();
}
