import { KyselyBookCategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookCategories';
import { KyselyBookSubcategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookSubcategories';
import { KyselyBookEntity } from 'src/app/modules/books/infrastructure/entity/entity';
import { KyselyCategoryEntity } from 'src/app/modules/books/modules/category/infrastructure/entity';
import { KyselyCoverTypeEntity } from 'src/app/modules/books/modules/coverType/infrastructure/entity';
import { KyselySubcategoryEntity } from 'src/app/modules/books/modules/subcategory/infrastructure/entity';
import { KyselyWriterEntity } from 'src/app/modules/books/modules/writer/infrastructure/entity';
import { KyselyUserEntity } from 'src/app/modules/users/infrastructure/entity/entity';
export interface IDb {
    users: KyselyUserEntity;
    books: KyselyBookEntity;
    categories: KyselyCategoryEntity;
    subcategories: KyselySubcategoryEntity;
    writers: KyselyWriterEntity;
    cover_types: KyselyCoverTypeEntity;
    book_categories: KyselyBookCategoryEntity;
    book_subcategories: KyselyBookSubcategoryEntity;
}
