import { UsersService } from './../../../users/user.service';
import { Injectable } from '@nestjs/common';
import { Order } from '../domain/domain';
import { EntityFactory } from 'src/app/shared/types/EntityFactory';
import { BooksService } from 'src/app/modules/books/book.service';
import { CreateOrderDto } from '../dto/create.dto';

@Injectable()
export class OrderFactory implements EntityFactory<CreateOrderDto, Order> {
  constructor(
    private readonly bookService: BooksService,
    private readonly usersService: UsersService,
  ) {}
  async createFromEntity(
    payload: CreateOrderDto,
    options: { user_id: string },
  ): Promise<Order> {
    const [user, books] = await Promise.all([
      this.usersService.findOne({ id: options.user_id }),
      this.bookService.findManyWithPagination({
        page: 1,
        limit: payload.books.length,
        filters: {
          'books.id': [
            {
              operator: 'in',
              value: payload.books.map((book) => book.id),
            },
          ],
        },
      }),
    ]);
    return new Order({
      entity: payload,
      user,
      books: books.data.map((book) => ({
        ...book,
        quantity: payload.books.find((b) => b.id === book.id)?.quantity ?? 0,
      })),
    });
  }
}
