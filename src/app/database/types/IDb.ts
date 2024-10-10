import { KyselyBookCategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookCategories';
import { KyselyBookSubcategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookSubcategories';
import { KyselyBookEntity } from 'src/app/modules/books/infrastructure/entity/entity';
import { KyselyCategoryEntity } from 'src/app/modules/books/modules/category/infrastructure/entity';
import { KyselyCoverTypeEntity } from 'src/app/modules/books/modules/coverType/infrastructure/entity';
import { KyselyShareHouseEntity } from 'src/app/modules/books/modules/shareHouse/infrastructure/entity';
import { KyselySubcategoryEntity } from 'src/app/modules/books/modules/subcategory/infrastructure/entity';
import { KyselyWriterEntity } from 'src/app/modules/books/modules/writer/infrastructure/entity';
import { KyselyOrderEntity } from 'src/app/modules/payment/orders/infrastructure/entity/entity';
import { KyselyOrderProductEntity } from 'src/app/modules/payment/orders/modules/order_products/infrastructure/entity';
import { KyselyUserEntity } from 'src/app/modules/users/infrastructure/entity/entity';
import { KyselyAddressEntity } from 'src/app/modules/users/modules/addresses/infrastructure/entity';

export interface IDb {
  users: KyselyUserEntity;
  books: KyselyBookEntity;
  categories: KyselyCategoryEntity;
  subcategories: KyselySubcategoryEntity;
  writers: KyselyWriterEntity;
  cover_types: KyselyCoverTypeEntity;
  book_categories: KyselyBookCategoryEntity;
  book_subcategories: KyselyBookSubcategoryEntity;
  share_houses: KyselyShareHouseEntity;
  addresses: KyselyAddressEntity;
  orders: KyselyOrderEntity;
  orders_products: KyselyOrderProductEntity;
}
