import {
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  Max,
  IsPositive,
  Min,
  IsArray,
  ArrayNotEmpty,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { BookStatusEnum, DiscountTypeEnum } from 'src/types/other/enums.types';
import { NewBook } from '../infrastructure/entity/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class CreateBookDto implements NewBook {
  @IsString({ message: TranslateDto('IsString') })
  name!: string;

  @IsString({ message: TranslateDto('IsString') })
  title!: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  writer_id!: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  share_house_id!: string;

  @IsString({ message: TranslateDto('IsString') })
  editor!: string;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Max(new Date().getFullYear() + 1, {
    message: TranslateDto('Max'),
  })
  release_year!: number;

  @IsString({ message: TranslateDto('IsString') })
  description!: string;

  @IsEnum(BookStatusEnum, {
    message: TranslateDto('IsEnum'),
  })
  status!: BookStatusEnum;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  cover_type_id!: string;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  weight!: number;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Min(0, { message: TranslateDto('Min') })
  page_count!: number;

  @IsString({ message: TranslateDto('IsString') })
  isbn!: string;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price!: number;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price_usd!: number;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  discount!: number;

  @IsEnum(DiscountTypeEnum, {
    message: TranslateDto('IsEnum'),
  })
  discount_type!: DiscountTypeEnum;

  @IsNumber({}, { message: TranslateDto('IsNumber') })
  stock!: number;

  @IsArray({ message: TranslateDto('IsArray') })
  @ArrayNotEmpty({ message: TranslateDto('ArrayNotEmpty') })
  @IsUrl({}, { message: TranslateDto('IsUrl'), each: true })
  images_urls!: string[];

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @ArrayNotEmpty({ message: TranslateDto('ArrayNotEmpty') })
  @IsUUID(4, { message: TranslateDto('IsUUID'), each: true })
  categories_ids?: string[];

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @ArrayNotEmpty({ message: TranslateDto('ArrayNotEmpty') })
  @IsUUID(4, { message: TranslateDto('IsUUID'), each: true })
  subcategories_ids?: string[];
}
