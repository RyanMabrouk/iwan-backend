import { KyselyBannerEntity } from 'src/app/modules/banners/infrastructure/entity';
import { KyselyBookCategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookCategories';
import { KyselyBookSubcategoryEntity } from 'src/app/modules/books/infrastructure/entity/bookSubcategories';
import { KyselyBookEntity } from 'src/app/modules/books/infrastructure/entity/entity';
import { KyselyCategoryEntity } from 'src/app/modules/books/modules/category/infrastructure/entity';
import { KyselyCornerEntity } from 'src/app/modules/books/modules/corners/infrastructure/entity';
import { KyselyCoverTypeEntity } from 'src/app/modules/books/modules/coverType/infrastructure/entity';
import { KyselyShareHouseEntity } from 'src/app/modules/books/modules/shareHouse/infrastructure/entity';
import { KyselySubcategoryEntity } from 'src/app/modules/books/modules/subcategory/infrastructure/entity';
import { KyselyWriterEntity } from 'src/app/modules/books/modules/writer/infrastructure/entity';
import { KyselyEventEntity } from 'src/app/modules/events/infrastructure/entity/entity';
import { KyselyEventBooksEntity } from 'src/app/modules/events/infrastructure/entity/eventBooks';
import { KyselyOrderEntity } from 'src/app/modules/payment/orders/infrastructure/entity/entity';
import { KyselyOrderProductEntity } from 'src/app/modules/payment/orders/modules/order_products/infrastructure/entity';
import { KyselyUserEntity } from 'src/app/modules/users/infrastructure/entity/entity';
import { KyselyWishlistEntity } from 'src/app/modules/users/modules/wishlist/infrastructure/entity';

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
  orders: KyselyOrderEntity;
  orders_products: KyselyOrderProductEntity;
  wishlists: KyselyWishlistEntity;
  banners: KyselyBannerEntity;
  corners: KyselyCornerEntity;
  events: KyselyEventEntity;
  event_books: KyselyEventBooksEntity;
}
