import { Kysely } from 'kysely';
import { Book } from 'src/app/modules/books/domain/domain';
import { KyselyBookEntity } from 'src/app/modules/books/infrastructure/entity/entity';

export async function up(
  db: Kysely<{
    books: KyselyBookEntity;
  }>,
) {
  const books = await db.selectFrom('books').selectAll().execute();

  for (const book of books) {
    const priceAfterDiscount = Book.calculatePriceAfterDiscount({
      price: book.price,
      discount: book.discount,
      discount_type: book.discount_type,
    });
    if (priceAfterDiscount !== book.price_after_discount) {
      await db
        .updateTable('books')
        .set({
          price_after_discount: Book.calculatePriceAfterDiscount({
            price: book.price,
            discount: book.discount,
            discount_type: book.discount_type,
          }),
        })
        .where('id', '=', book.id)
        .execute();
    }
  }
}

export async function down() {
  // Down migrations are not supported
}
