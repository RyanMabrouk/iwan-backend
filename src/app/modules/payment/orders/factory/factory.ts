import { OfferService } from './../../../offers/offer.service';
import { UsersService } from './../../../users/user.service';
import { Injectable } from '@nestjs/common';
import { Order } from '../domain/domain';
import { EntityFactory } from 'src/app/shared/types/EntityFactory';
import { BooksService } from 'src/app/modules/books/book.service';
import { CreateOrder } from '../dto/create.dto';
import { CreateOrderProductDto } from '../modules/order_products/dto';

@Injectable()
export class OrderFactory implements EntityFactory<CreateOrder, Order> {
  constructor(
    private readonly bookService: BooksService,
    private readonly usersService: UsersService,
    private readonly offerService: OfferService,
  ) {}
  async createFromEntity(
    payload: CreateOrder,
    options: {
      user_id: string;
      books?: CreateOrderProductDto[];
      offer_id?: string;
    },
  ): Promise<Order> {
    const offer = options.offer_id
      ? await this.offerService.findOne({ id: options.offer_id })
      : null;
    const [user, books] = await Promise.all([
      this.usersService.findOne({ id: options.user_id }),
      offer
        ? offer.books.map((book) => ({
            ...book,
            quantity: 1,
          }))
        : this.bookService
            .findManyWithPagination({
              page: 1,
              limit: options.books!.length,
              filters: {
                'books.id': [
                  {
                    operator: 'in',
                    value: options.books!.map((book) => book.id),
                  },
                ],
              },
            })
            .then((res) => {
              return res.data.map((book) => ({
                ...book,
                quantity:
                  options.books?.find((b) => b.id === book.id)?.quantity ?? 0,
              }));
            }),
    ]);
    return new Order({
      entity: payload,
      user,
      offer: offer,
      books,
    });
  }
}
