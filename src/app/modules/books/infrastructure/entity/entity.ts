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
import { ShareHouseEntity } from '../../modules/shareHouse/infrastructure/entity';

export interface KyselyBookEntity {
  id: GeneratedAlways<string>;
  title: string;
  writer_id: string | null; // foreign key
  release_year: number | null; // foreign key
  cover_type_id: string | null; // foreign
  corner_id: string | null; // foreign key
  share_house_id: string;
  editor: string;
  description: string;
  status: BookStatusEnum;
  weight: number;
  page_count: number;
  isbn: string;
  price: number;
  price_after_discount: number;
  price_dhs: number;
  discount: number;
  discount_type: DiscountTypeEnum;
  images_urls: string[];
  stock: number;
  meta_title: string;
  meta_description: string;
  meta_image: string;
  canonical: string;
  slug: string;
  meta_keywords: string[];
  structured_data: string;
  number_of_volumes: number;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type BookEntity = Selectable<KyselyBookEntity>;
export interface IBookPopulated extends BookEntity {
  categories: CategoryEntity[];
  subcategories: SubcategoryEntity[];
  cover_type: CoverTypeEntity | null;
  writer: WriterEntity | null;
  share_house: ShareHouseEntity | null;
}
export type NewBook = Insertable<KyselyBookEntity>;
export type UpdateBook = Updateable<KyselyBookEntity>;
export type IQueryBookKeys = `books.${keyof KyselyBookEntity}`;
