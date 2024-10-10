import { AggregateRoot } from '@nestjs/cqrs';
import { BookEntity } from 'src/app/modules/books/infrastructure/entity/entity';
import { CreateOrderDto } from '../dto/create.dto';
import { UserEntity } from 'src/app/modules/users/infrastructure/entity/entity';
import { BadRequestException } from '@nestjs/common';
import { ERRORS } from 'src/assets/constants/errors';

export class Order extends AggregateRoot {
  readonly data: CreateOrderDto;
  readonly books: (BookEntity & {
    quantity: number;
  })[];
  readonly user: UserEntity;
  readonly total_price: number;
  readonly delivery_price: number;
  constructor({
    entity,
    books,
    user,
  }: {
    entity: CreateOrderDto;
    books: (BookEntity & {
      quantity: number;
    })[];
    user: UserEntity;
  }) {
    super();
    this.data = entity;
    this.books = books;
    this.user = user;
    this.total_price = this.calculateTotalPrice();
    this.delivery_price = this.calculateDeliveryPrice();
    this.allQuantitiesMustBeGreaterThanZero();
    this.allBooksMustBeAvailable();
    this.booksMustNotBeEmptyArray();
  }
  private calculateTotalPrice(): number {
    return this.books.reduce((acc, book) => {
      return acc + book.price_after_discount * book.quantity;
    }, 0);
  }

  private calculateDeliveryPrice(): number {
    return this.total_price > 100 ? 0 : 10;
  }

  private allQuantitiesMustBeGreaterThanZero() {
    if (!this.books.every((book) => book.quantity > 0)) {
      throw new BadRequestException(
        ERRORS('All quantities must be greater than zero'),
      );
    }
  }

  private allBooksMustBeAvailable() {
    if (this.books.some((book) => book.quantity > book.stock)) {
      throw new BadRequestException(ERRORS('Some books are not available'));
    }
  }

  private booksMustNotBeEmptyArray() {
    if (this.books.length === 0) {
      throw new BadRequestException(ERRORS('Books must not be empty'));
    }
  }
}
