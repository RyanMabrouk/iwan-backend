import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface KyselyWishlistEntity {
  user_id: string;
  book_id: string;
  created_at: ColumnType<Date, never, Date>;
}

export type WishlistEntity = Selectable<KyselyWishlistEntity>;
export type NewWishlist = Insertable<KyselyWishlistEntity>;
export type UpdateWishlist = Updateable<KyselyWishlistEntity>;
