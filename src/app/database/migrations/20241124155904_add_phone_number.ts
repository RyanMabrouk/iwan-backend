import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('users')
    .addColumn('phone_number', 'text', (col) => col.notNull().defaultTo(''))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('users')
    .dropColumn('phone_number')
    .execute();
}
