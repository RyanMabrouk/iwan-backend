"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db
        .withSchema('public')
        .schema.dropTable('book_subcategories')
        .execute();
    await db.withSchema('public').schema.dropTable('book_categories').execute();
    await db.withSchema('public').schema.dropTable('books').execute();
    await db.withSchema('public').schema.dropTable('subcategories').execute();
    await db.withSchema('public').schema.dropTable('categories').execute();
    await db.withSchema('public').schema.dropTable('cover_types').execute();
    await db.withSchema('public').schema.dropTable('writers').execute();
    await db.withSchema('public').schema.dropType('status_enum').execute();
    await db.withSchema('public').schema.dropType('discount_type_enum').execute();
    await db
        .withSchema('public')
        .schema.createTable('writers')
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo((0, kysely_1.sql) `gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('cover_types')
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo((0, kysely_1.sql) `gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('categories')
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo((0, kysely_1.sql) `gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('subcategories')
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo((0, kysely_1.sql) `gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('category_id', 'uuid', (col) => col.notNull().references('categories.id').onDelete('cascade'))
        .addColumn('created_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .addColumn('updated_at', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `now()`))
        .execute();
    await db
        .withSchema('public')
        .schema.createType('discount_type_enum')
        .asEnum(['percentage', 'unavailable'])
        .execute();
    await db
        .withSchema('public')
        .schema.createType('status_enum')
        .asEnum(['available', 'fixed'])
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('books')
        .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo((0, kysely_1.sql) `gen_random_uuid()`))
        .addColumn('name', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('title', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('writer_id', 'uuid', (col) => col.references('writers.id').notNull().onDelete('cascade'))
        .addColumn('share_house', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('editor', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('release_year', 'integer', (col) => col.notNull())
        .addColumn('description', 'text', (col) => col.defaultTo('').notNull())
        .addColumn('status', (0, kysely_1.sql) `status_enum`)
        .addColumn('cover_type_id', 'uuid', (col) => col.references('cover_types.id').notNull().notNull().onDelete('cascade'))
        .addColumn('weight', 'integer', (col) => col.notNull())
        .addColumn('page_count', 'integer', (col) => col.notNull())
        .addColumn('isbn', 'text', (col) => col.notNull().defaultTo(''))
        .addColumn('price', 'integer', (col) => col.notNull())
        .addColumn('price_usd', 'integer', (col) => col.notNull())
        .addColumn('discount', 'integer', (col) => col.notNull())
        .addColumn('discount_type', (0, kysely_1.sql) `discount_type_enum`, (col) => col.notNull())
        .addColumn('stock', 'integer', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.defaultTo((0, kysely_1.sql) `now()`).notNull())
        .addColumn('updated_at', 'timestamp', (col) => col.defaultTo((0, kysely_1.sql) `now()`).notNull())
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('book_categories')
        .addColumn('category_id', 'uuid', (col) => col.notNull().references('categories.id').onDelete('cascade'))
        .addColumn('book_id', 'uuid', (col) => col.notNull().references('books.id').onDelete('cascade'))
        .addPrimaryKeyConstraint('book_categories_pkey', ['category_id', 'book_id'])
        .execute();
    await db
        .withSchema('public')
        .schema.createTable('book_subcategories')
        .addColumn('subcategory_id', 'uuid', (col) => col.notNull().references('subcategories.id').onDelete('cascade'))
        .addColumn('book_id', 'uuid', (col) => col.notNull().references('books.id').onDelete('cascade'))
        .addPrimaryKeyConstraint('book_subcategories_pkey', [
        'subcategory_id',
        'book_id',
    ])
        .execute();
}
async function down(db) {
    await db
        .withSchema('public')
        .schema.dropTable('book_subcategories')
        .execute();
    await db.withSchema('public').schema.dropTable('book_categories').execute();
    await db.withSchema('public').schema.dropTable('books').execute();
    await db.withSchema('public').schema.dropTable('subcategories').execute();
    await db.withSchema('public').schema.dropTable('categories').execute();
    await db.withSchema('public').schema.dropTable('cover_types').execute();
    await db.withSchema('public').schema.dropTable('writers').execute();
    await db.withSchema('public').schema.dropType('status_enum').execute();
    await db.withSchema('public').schema.dropType('discount_type_enum').execute();
}
//# sourceMappingURL=20241003202202_books_table.js.map