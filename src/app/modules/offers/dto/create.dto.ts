import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  IsUrl,
  IsArray,
  IsUUID,
  ArrayMinSize,
} from 'class-validator';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';
import { NewOffer } from '../infrastructure/entity';

export class CreateOfferDto implements NewOffer {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({
    message: TranslateDto('IsNotEmpty'),
  })
  title!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsOptional()
  description?: string;

  @IsUrl({}, { message: TranslateDto('IsUrl') })
  @IsNotEmpty({
    message: TranslateDto('IsNotEmpty'),
  })
  image_url!: string;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price_before_offer!: number;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price_after_offer!: number;

  @IsUUID(4, { message: TranslateDto('IsUUID'), each: true })
  @IsArray({ message: TranslateDto('IsArray') })
  @ArrayMinSize(1, { message: TranslateDto('ArrayMinSize') })
  book_ids!: string[];
}
