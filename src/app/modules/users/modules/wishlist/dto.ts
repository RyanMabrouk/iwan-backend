import { IsUUID } from 'class-validator';
import { NewWishlist } from './infrastructure/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewWishlistDto implements Omit<NewWishlist, 'user_id'> {
  @IsUUID(4, {
    message: TranslateDto('IsUUID'),
  })
  book_id!: string;
}
