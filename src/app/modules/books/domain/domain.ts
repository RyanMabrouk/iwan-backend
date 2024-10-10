import { AggregateRoot } from '@nestjs/cqrs';
import { NewBook } from '../infrastructure/entity/entity';
import { DiscountTypeEnum } from 'src/types/other/enums.types';

export class Book extends AggregateRoot {
  readonly data: NewBook;
  constructor(entity: NewBook) {
    super();
    this.data = entity;
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
