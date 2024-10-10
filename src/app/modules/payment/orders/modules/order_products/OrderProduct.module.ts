import { OrderProductRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { OrderProductService } from './OrderProduct.service';

@Module({
  imports: [DatabaseModule],
  providers: [OrderProductRepository, OrderProductService],
  exports: [OrderProductRepository, OrderProductService],
})
export class OrderProductModule {}
