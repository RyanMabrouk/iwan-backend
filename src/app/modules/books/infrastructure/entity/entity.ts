import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { BookStatusEnum, DiscountTypeEnum } from 'src/types/other/enums.types';
import { CategoryEntity } from '../../modules/category/infrastructure/entity';
import { SubcategoryEntity } from '../../modules/subcategory/infrastructure/entity';
import { CoverTypeEntity } from '../../modules/coverType/infrastructure/entity';
import { WriterEntity } from '../../modules/writer/infrastructure/entity';

export interface KyselyBookEntity {
  id: GeneratedAlways<string>;
  name: string;
  title: string;
  writer_id: string;
  share_house: string;
  editor: string;
  release_year: number;
  description: string;
  status: BookStatusEnum;
  cover_type_id: string;
  weight: number;
  page_count: number;
  isbn: string;
  price: number;
  price_usd: number;
  discount: number;
  discount_type: DiscountTypeEnum;
  stock: number;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type BookEntity = Selectable<KyselyBookEntity>;
export interface IBookPopulated extends BookEntity {
  categories: CategoryEntity[];
  subcategories: SubcategoryEntity[];
  cover_type: CoverTypeEntity | null;
  writer: WriterEntity | null;
}
export type NewBook = Insertable<KyselyBookEntity>;
export type UpdateBook = Updateable<KyselyBookEntity>;
export type IQueryBookKeys = `books.${keyof KyselyBookEntity}`;
