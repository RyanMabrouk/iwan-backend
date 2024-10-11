import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .alterColumn('writer_id', (col) => col.dropNotNull())
    .alterColumn('release_year', (col) => col.dropNotNull())
    .alterColumn('cover_type_id', (col) => col.dropNotNull())
    .alterColumn('weight', (col) => col.setDataType('int8'))
    .alterColumn('weight', (col) => col.setDefault(0))
    .alterColumn('page_count', (col) => col.setDataType('int8'))
    .alterColumn('page_count', (col) => col.setDefault(0))
    .alterColumn('price', (col) => col.setDataType('int8'))
    .alterColumn('price', (col) => col.setDefault(0))
    .dropColumn('price_usd')
    .addColumn('price_dhs', 'int8', (col) => col.notNull().defaultTo(0))
    .alterColumn('discount', (col) => col.setDataType('int8'))
    .alterColumn('discount', (col) => col.setDefault(0))
    .alterColumn('discount_type', (col) => col.setDefault('fixed'))
    .alterColumn('stock', (col) => col.setDataType('int8'))
    .alterColumn('stock', (col) => col.setDefault(0))
    .addColumn('meta_title', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('meta_description', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('meta_image', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('canonical', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('slug', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('structured_data', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('price_after_discount', 'int8', (col) =>
      col.notNull().defaultTo(0),
    )
    .addColumn('meta_keywords', sql`text[]`, (col) =>
      col.notNull().defaultTo('{}'),
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db
    .withSchema('public')
    .schema.alterTable('books')
    .alterColumn('writer_id', (col) => col.setNotNull())
    .alterColumn('release_year', (col) => col.setNotNull())
    .alterColumn('cover_type_id', (col) => col.setNotNull())
    .alterColumn('weight', (col) => col.setDataType('int4'))
    .alterColumn('weight', (col) => col.dropDefault())
    .alterColumn('page_count', (col) => col.setDataType('int4'))
    .alterColumn('page_count', (col) => col.dropDefault())
    .alterColumn('price', (col) => col.setDataType('int4'))
    .alterColumn('price', (col) => col.dropDefault())
    .addColumn('price_usd', 'int8', (col) => col.notNull().defaultTo(0))
    .dropColumn('price_dhs')
    .alterColumn('discount', (col) => col.setDataType('int4'))
    .alterColumn('discount', (col) => col.dropDefault())
    .alterColumn('discount_type', (col) => col.dropDefault())
    .alterColumn('stock', (col) => col.setDataType('int4'))
    .alterColumn('stock', (col) => col.dropDefault())
    .dropColumn('meta_title')
    .dropColumn('meta_description')
    .dropColumn('meta_image')
    .dropColumn('canonical')
    .dropColumn('slug')
    .dropColumn('structured_data')
    .dropColumn('price_after_discount')
    .dropColumn('meta_keywords')
    .execute();
}
