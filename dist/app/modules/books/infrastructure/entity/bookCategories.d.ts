import { Insertable, Selectable, Updateable } from 'kysely';
export interface KyselyBookCategoryEntity {
    book_id: string;
    category_id: string;
}
export type BookCategoryEntity = Selectable<KyselyBookCategoryEntity>;
export type NewBookCategory = Insertable<KyselyBookCategoryEntity>;
export type UpdateBookCategory = Updateable<KyselyBookCategoryEntity>;
export type IQueryBookCategoryKeys = `book_categories.${keyof KyselyBookCategoryEntity}`;
