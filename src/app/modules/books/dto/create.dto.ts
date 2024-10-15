import {
  IsString,
  IsNumber,
  IsEnum,
  IsUUID,
  Max,
  IsPositive,
  Min,
  IsArray,
  IsUrl,
  IsOptional,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { BookStatusEnum, DiscountTypeEnum } from 'src/types/other/enums.types';
import { NewBook } from '../infrastructure/entity/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class CreateBookDto implements Omit<NewBook, 'price_after_discount'> {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({
    message: TranslateDto('IsNotEmpty'),
  })
  title!: string;

  @IsOptional()
  @IsUUID(4, { message: TranslateDto('IsUUID') })
  writer_id!: string;

  @IsOptional()
  @IsUUID(4, { message: TranslateDto('IsUUID') })
  share_house_id!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  editor!: string;

  @IsOptional()
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Max(new Date().getFullYear() + 1, {
    message: TranslateDto('Max'),
  })
  release_year!: number;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  description!: string;

  @IsOptional()
  @IsEnum(BookStatusEnum, {
    message: TranslateDto('IsEnum'),
  })
  status!: BookStatusEnum;

  @IsOptional()
  @IsUUID(4, { message: TranslateDto('IsUUID') })
  cover_type_id!: string;

  @IsOptional()
  @ValidateIf((o) => Number(o.weight) !== 0)
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  weight!: number;

  @IsOptional()
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Min(0, { message: TranslateDto('Min') })
  page_count!: number;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  isbn!: string;

  @IsOptional()
  @ValidateIf((o) => Number(o.price) !== 0)
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price!: number;

  @IsOptional()
  @ValidateIf((o) => Number(o.price_dhs) !== 0)
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  price_dhs!: number;

  @IsOptional()
  @ValidateIf((o) => Number(o.discount) !== 0)
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({ message: TranslateDto('IsPositive') })
  discount!: number;

  @IsOptional()
  @IsEnum(DiscountTypeEnum, {
    message: TranslateDto('IsEnum'),
  })
  discount_type!: DiscountTypeEnum;

  @IsOptional()
  @ValidateIf((o) => Number(o.stock) !== 0)
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @IsPositive({
    message: TranslateDto('IsPositive'),
  })
  stock!: number;

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @IsUrl({}, { message: TranslateDto('IsUrl'), each: true })
  images_urls!: string[];

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @IsUUID(4, { message: TranslateDto('IsUUID'), each: true })
  categories_ids?: string[];

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @IsUUID(4, { message: TranslateDto('IsUUID'), each: true })
  subcategories_ids?: string[];

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  meta_title!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  meta_description!: string;

  @IsOptional()
  @IsUrl({}, { message: TranslateDto('IsUrl') })
  meta_image!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  canonical!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  slug!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  structured_data!: string;

  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @IsString({ each: true, message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  meta_keywords!: string[];

  @IsOptional()
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Min(0, { message: TranslateDto('Min') })
  number_of_volumes!: number;

  @IsOptional()
  @IsUUID(4, { message: TranslateDto('IsUrl') })
  corner_id!: string;
}
