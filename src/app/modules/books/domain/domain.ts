import { AggregateRoot } from '@nestjs/cqrs';
import { NewBook } from '../infrastructure/entity/entity';
import { DiscountTypeEnum } from 'src/types/other/enums.types';
import { BadRequestException } from '@nestjs/common';
import { ERRORS } from 'src/assets/constants/errors';

export class Book extends AggregateRoot {
  readonly data: NewBook;
  constructor(entity: NewBook) {
    super();
    this.data = entity;
    if (
      this.data.price_after_discount &&
      this.data.price &&
      this.data.price_after_discount > this.data.price
    ) {
      throw new BadRequestException(
        ERRORS('Price after discount cannot be greater than price'),
      );
    }
  }
  static calculatePriceAfterDiscount({
    price,
    discount,
    discount_type,
  }: {
    price: number;
    discount: number;
    discount_type: DiscountTypeEnum;
  }): number {
    if (discount_type === DiscountTypeEnum.FIXED) {
      return price - discount > 0 ? price - discount : 0;
    }
    if (discount_type === DiscountTypeEnum.PERCENTAGE) {
      return price - price * (discount / 100);
    }
    return price;
  }
}
