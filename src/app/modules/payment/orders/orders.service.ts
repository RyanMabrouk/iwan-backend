import { UsersService } from './../../users/user.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderFactory } from './factory/factory';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { IOrderPopulated, OrderEntity } from './infrastructure/entity/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { UpdateOrderDto } from './dto/update.dto';
import { QueryOrderDto } from './dto/query.dto';
import { OrderRepository } from './infrastructure/repositories/repository';
import { OrderProductService } from './modules/order_products/OrderProduct.service';
import {
  CreateCancelOrderDto,
  CreateOrder,
  CreateOrderFromCartDto,
  CreateOrderFromOfferDto,
} from './dto/create.dto';
import { PaymentStatusEnum, RolesEnum } from 'src/types/other/enums.types';
import { BooksService } from '../../books/book.service';
import { sendMail } from 'src/app/mail/send';
import {
  orderCancellationTemplate,
  orderDeliveryTemplate,
  orderPlacementTemplates,
} from 'src/app/mail/templates/emailTemplates';
import { CreateOrderProductDto } from './modules/order_products/dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly ordersProducts: OrderProductService,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
    private readonly factory: OrderFactory,
  ) {}

  async findManyWithPagination(
    query: QueryOrderDto,
  ): Promise<InfinityPaginationResultType<IOrderPopulated>> {
    return this.repository.findManyWithPagination(query);
  }

  async findOne({ id }: { id: string }): Promise<IOrderPopulated> {
    const Order = await this.repository.findOne({ id: id });
    if (Order === null) {
      throw new NotFoundException(ERRORS('Order not found'));
    }
    return Order;
  }

  async createFromCart({
    payload,
    user_id,
  }: {
    payload: CreateOrderFromCartDto;
    user_id: string;
  }) {
    const { books, ...rest } = payload;
    const entity = await this.createOne({
      payload: rest,
      user_id,
      books,
    });

    return entity;
  }

  async createFromOffer({
    payload,
    user_id,
  }: {
    payload: CreateOrderFromOfferDto;
    user_id: string;
  }) {
    const { offer_id, ...rest } = payload;
    const entity = await this.createOne({
      payload: rest,
      user_id,
      offer_id,
    });

    return entity;
  }

  async createOne({
    payload,
    user_id,
    books,
    offer_id,
  }: {
    payload: CreateOrder;
    user_id: string;
    books?: CreateOrderProductDto[];
    offer_id?: string;
  }): Promise<OrderEntity> {
    const order = await this.factory.createFromEntity(payload, {
      user_id,
      offer_id,
      books,
    });
    const entity = await this.repository.createOne({
      ...payload,
      total_price: order.total_price,
      delivery_price: order.delivery_price,
      user_id,
      status: PaymentStatusEnum.PENDING,
    });
    if (entity === null) {
      throw new NotFoundException(ERRORS('Order not found'));
    }

    await this.ordersProducts.createMany(
      order.books.map((book) => ({
        book_id: book.id,
        quantity: book.quantity,
        price_before_discount: book.price_after_discount,
        discount: book.discount,
        discount_type: book.discount_type,
        order_id: entity?.id,
      })),
    );

    const user = await this.usersService.findOne({ id: user_id });

    await sendMail({
      to: entity.email,
      subject: 'تم إنشاء طلبك',
      text: 'تم إنشاء طلبك بنجاح',
      html: orderPlacementTemplates(
        user.roles.includes(RolesEnum.ADMIN),
        entity,
        order.books,
        entity.total_price,
        entity.delivery_price,
      ),
    });

    return entity;
  }

  async cancelOrder({
    id,
    payload,
    user_id,
  }: {
    id: string;
    user_id: string;
    payload: CreateCancelOrderDto;
  }): Promise<OrderEntity> {
    const order = await this.findOne({ id });
    if (order.status === PaymentStatusEnum.CANCELED) {
      throw new NotFoundException(ERRORS('Order already canceled'));
    }
    const updatedEntity = await this.repository.changeStatus({
      id,
      status: PaymentStatusEnum.CANCELED,
      cancel_reason: payload.cancel_reason,
    });
    if (updatedEntity === null) {
      throw new NotFoundException(ERRORS('Order not found'));
    }
    const user = await this.usersService.findOne({ id: user_id });

    await sendMail({
      to: order.email,
      subject: 'تم إلغاء طلبك',
      text: 'لقد تم إلغاء طلبك',
      html: orderCancellationTemplate(
        user.roles.includes(RolesEnum.ADMIN),
        updatedEntity,
        updatedEntity.id,
        payload.cancel_reason,
      ),
    });
    return updatedEntity;
  }

  async confirmOrder({
    id,
    user_id,
  }: {
    id: string;
    user_id: string;
  }): Promise<OrderEntity> {
    const order = await this.findOne({ id });
    if (order.status === PaymentStatusEnum.PAID) {
      throw new NotFoundException(ERRORS('Order already confirmed'));
    }
    const updatedEntity = await this.repository.changeStatus({
      id,
      status: PaymentStatusEnum.PAID,
    });
    if (updatedEntity === null) {
      throw new NotFoundException(ERRORS('Order not found'));
    }
    await Promise.all([
      ...order.products.map((product) =>
        this.booksService.decrementStock({
          id: product.book_id,
          quantity: product.quantity,
        }),
      ),
    ]);
    const user = await this.usersService.findOne({ id: user_id });

    await sendMail({
      to: order.email,
      subject: 'تم تأكيد طلبك',
      text: 'لقد تم تأكيد طلبك',
      html: orderDeliveryTemplate(
        user.roles.includes(RolesEnum.ADMIN),
        updatedEntity,
        updatedEntity.id,
        order.updated_at.toLocaleDateString(),
        order.address,
      ),
    });
    return updatedEntity;
  }

  async updateOne(
    id: string,
    payload: UpdateOrderDto,
    user_id: string,
  ): Promise<OrderEntity> {
    const order_before_update = await this.findOne({ id });
    if (order_before_update.user_id !== user_id) {
      throw new NotFoundException(ERRORS('This order does not belong to you'));
    }
    const order = await this.repository.updateOne({ id, payload });
    if (order === null) {
      throw new NotFoundException(ERRORS('Order not found'));
    }
    return order;
  }

  async deleteOne(id: string): Promise<OrderEntity> {
    const order = await this.findOne({ id });
    await this.repository.deleteOne({ id });
    await this.ordersProducts.deleteMany({ order_id: id });
    return order;
  }
}
