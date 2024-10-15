import { IsUrl, IsUUID } from 'class-validator';
import { NewBanner, UpdateBanner } from './infrastructure/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewBannerDto implements NewBanner {
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  url!: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  book_id!: string;
}

export class UpdateBannerDto implements UpdateBanner {
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  url?: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  book_id?: string;
}
