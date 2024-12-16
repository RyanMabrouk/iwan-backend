import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';
import { PaymentMethodEnum } from 'src/types/other/enums.types';
import { CreateOrderProductDto } from '../modules/order_products/dto';
import { Type } from 'class-transformer';

export class CreateOrder {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;

  @IsEmail({}, { message: TranslateDto('IsEmail') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  email!: string;

  @IsString({ message: TranslateDto('IsString') })
  phone_number!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  address!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  city!: string;

  @IsPostalCode('TN', { message: TranslateDto('IsPostalCode') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  postal_code!: string;

  @IsEnum(PaymentMethodEnum, { message: TranslateDto('IsEnum') })
  payment_method!: PaymentMethodEnum;
}

export class CreateCancelOrderDto {
  @IsString({ message: TranslateDto('IsString') })
  cancel_reason!: string;
}

export class CreateOrderFromCartDto extends CreateOrder {
  @IsArray({ message: TranslateDto('IsArray') })
  @ArrayNotEmpty({ message: TranslateDto('ArrayNotEmpty') })
  @Type(() => CreateOrderProductDto)
  @ValidateNested({ each: true })
  books!: CreateOrderProductDto[];
}

export class CreateOrderFromOfferDto extends CreateOrder {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  offer_id!: string;
}
