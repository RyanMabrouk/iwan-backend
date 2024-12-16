import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './infrastructure/repositories/repository';
import { OrderFactory } from './factory/factory';
import { OrdersService } from './orders.service';
import { DatabaseModule } from 'src/app/database/database.module';
import { OrderProductModule } from './modules/order_products/OrderProduct.module';
import { BooksModule } from '../../books/book.module';
import { UsersModule } from '../../users/user.module';
import { OfferModule } from '../../offers/offer.module';

@Module({
  imports: [
    DatabaseModule,
    OrderProductModule,
    BooksModule,
    UsersModule,
    OfferModule,
  ],
  controllers: [OrdersController],
  providers: [OrderFactory, OrderRepository, OrdersService],
  exports: [OrderFactory, OrderRepository, OrdersService, OrderProductModule],
})
export class OrdersModule {}
