import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('writers')
    .addColumn('nationality', 'text', (col) => col.defaultTo(null))
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('writers')
    .dropColumn('nationality')
    .execute();
}
