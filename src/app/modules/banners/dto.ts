import { IsOptional, IsUrl, IsUUID } from 'class-validator';
import { NewBanner, UpdateBanner } from './infrastructure/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewBannerDto implements NewBanner {
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  url!: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  book_id!: string;

  @IsUrl({}, { message: TranslateDto('IsUrl') })
  phone_url!: string;
}

export class UpdateBannerDto implements UpdateBanner {
  @IsOptional()
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  url?: string;

  @IsOptional()
  @IsUUID(4, { message: TranslateDto('IsUUID') })
  book_id?: string;

  @IsOptional()
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  phone_url?: string;
}
