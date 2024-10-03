import { Insertable, Selectable, Updateable } from 'kysely';

export interface KyselyBookSubcategoryEntity {
  book_id: string;
  subcategory_id: string;
}

export type BookSubcategoryEntity = Selectable<KyselyBookSubcategoryEntity>;
export type NewBookSubcategory = Insertable<KyselyBookSubcategoryEntity>;
export type UpdateBookSubcategory = Updateable<KyselyBookSubcategoryEntity>;
export type IQueryBookSubcategoryKeys =
  `book_subcategories.${keyof KyselyBookSubcategoryEntity}`;
