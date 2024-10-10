import { DiscountTypeEnum } from 'src/types/other/enums.types';
import { NewOrderProduct } from './infrastructure/entity';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateOrderProductDto {
  @IsUUID('4', { message: 'IsUUID' })
  id!: string; // This is a foreign key

  @IsNumber({}, { message: 'IsNumber' })
  @IsPositive({ message: 'IsPositive' })
  quantity!: number;
}

export class NewOrderProductDto implements NewOrderProduct {
  book_id!: string; // This is a foreign key
  quantity!: number;
  price_before_discount!: number;
  discount!: number;
  discount_type!: DiscountTypeEnum;
  order_id!: string; // This is a foreign key
}
