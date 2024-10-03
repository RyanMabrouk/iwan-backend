"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db
        .withSchema('public')
        .schema.createType('roles_enum')
        .asEnum(['user', 'admin'])
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('users')
        .addColumn('user_id', 'uuid', (col) => col.primaryKey().references('auth.users.id').onDelete('cascade'))
        .addColumn('roles', (0, kysely_1.sql) `roles_enum[]`, (col) => col.defaultTo('{user}').notNull())
        .addColumn('avatar', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('first_name', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('last_name', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('email', 'text', (col) => col.notNull())
        .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP`))
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP`))
        .execute();
}
async function down(db) {
    await db.withSchema('public').schema.dropTable('users').execute();
    await db.withSchema('public').schema.dropType('roles_enum').execute();
}
//# sourceMappingURL=20241001222019_user_profile_table.js.map