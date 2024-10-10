import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db
    .withSchema('public')
    .schema.createType('payment_method_enum')
    .asEnum(['onDelivery', 'online', 'bank'])
    .execute();
  await db
    .withSchema('public')
    .schema.createType('payment_status_enum')
    .asEnum(['pending', 'paid', 'canceled'])
    .execute();
  await db
    .withSchema('public')
    .schema.createTable('orders')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('total_price', 'int8', (col) => col.notNull())
    .addColumn('delivery_price', 'int8', (col) => col.notNull())
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().references('users.user_id').onDelete('cascade'),
    )
    .addColumn('status', sql`payment_status_enum`, (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull())
    .addColumn('phone_number', 'text', (col) => col.notNull())
    .addColumn('address', 'text', (col) => col.notNull())
    .addColumn('city', 'text', (col) => col.notNull())
    .addColumn('postal_code', 'text', (col) => col.notNull())
    .addColumn('payment_method', sql`payment_method_enum`, (col) =>
      col.notNull(),
    )
    .addColumn('cancel_reason', 'text')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db
    .withSchema('public')
    .schema.createTable('orders_products')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`),
    )
    .addColumn('book_id', 'uuid', (col) =>
      col.notNull().references('books.id').onDelete('cascade'),
    )
    .addColumn('quantity', 'int8', (col) => col.notNull())
    .addColumn('price_before_discount', 'int8', (col) => col.notNull())
    .addColumn('discount', 'int8', (col) => col.notNull())
    .addColumn('discount_type', sql`discount_type_enum`, (col) => col.notNull())
    .addColumn('order_id', 'uuid', (col) =>
      col.notNull().references('orders.id').onDelete('cascade'),
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('orders').execute();
  await db.schema.dropTable('order_products').execute();
  await db.schema.dropType('payment_status_enum').execute();
  await db.schema.dropType('payment_method_enum').execute();
}
