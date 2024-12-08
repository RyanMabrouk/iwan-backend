import {
  ColumnType,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';
import { BookEntity } from '../../../infrastructure/entity/entity';
import { UserEntity } from 'src/app/modules/users/infrastructure/entity/entity';

export interface KyselyReviewEntity {
  id: GeneratedAlways<string>;
  rating: number;
  content: string;
  book_id: ColumnType<string, string, never>;
  user_id: ColumnType<string, string, never>;
  created_at: GeneratedAlways<Date>;
  updated_at: ColumnType<Date, never, Date>;
}

export type ReviewEntity = Selectable<KyselyReviewEntity>;
export interface ReviewEntityPopulated extends ReviewEntity {
  book: BookEntity | null;
  user: UserEntity | null;
}
export type NewReview = Insertable<KyselyReviewEntity>;
export type UpdateReview = Updateable<KyselyReviewEntity>;
export type IQueryReviewKeys = `reviews.${keyof ReviewEntity}`;
