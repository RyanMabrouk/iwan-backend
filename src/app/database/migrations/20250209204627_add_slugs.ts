import { Kysely } from 'kysely';
import { KyselyBookEntity } from 'src/app/modules/books/infrastructure/entity/entity';

export async function up(
  db: Kysely<{
    books: KyselyBookEntity;
  }>,
) {
  const books = await db.selectFrom('books').selectAll().execute();
  await Promise.all(
    books.map((book) => {
      const slug = book.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\//g, '-');
      return db
        .updateTable('books')
        .set({ slug })
        .where('books.id', '=', book.id)
        .execute();
    }),
  );
}

export async function down(db: Kysely<unknown>) {
  // TODO: Implement rollback logic
}
