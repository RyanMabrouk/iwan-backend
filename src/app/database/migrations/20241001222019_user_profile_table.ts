import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.createType('roles_enum')
    .asEnum(['user', 'admin'])
    .execute();
  await db
    .withSchema('public')
    .schema.createTable('users')
    .addColumn('user_id', 'uuid', (col) =>
      col.primaryKey().references('auth.users.id').onDelete('cascade'),
    )
    .addColumn('roles', sql`roles_enum[]`, (col) =>
      col.defaultTo('{user}').notNull(),
    )
    .addColumn('avatar', 'text', (col) => col.defaultTo('').notNull())
    .addColumn('first_name', 'text', (col) => col.defaultTo('').notNull())
    .addColumn('last_name', 'text', (col) => col.defaultTo('').notNull())
    .addColumn('email', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.withSchema('public').schema.dropTable('users').execute();
  await db.withSchema('public').schema.dropType('roles_enum').execute();
}
