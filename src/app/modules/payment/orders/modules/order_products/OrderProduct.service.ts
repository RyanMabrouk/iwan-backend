import { Injectable } from '@nestjs/common';
import { OrderProductRepository } from './infrastructure/repository';
import { OrderProductEntity, NewOrderProduct } from './infrastructure/entity';

@Injectable()
export class OrderProductService {
  constructor(
    private readonly OrderProductRepository: OrderProductRepository,
  ) {}

  async findMany(): Promise<OrderProductEntity[]> {
    return await this.OrderProductRepository.findMany();
  }

  async createMany(payload: NewOrderProduct[]): Promise<OrderProductEntity[]> {
    return await this.OrderProductRepository.createMany(payload);
  }

  async deleteMany({
    order_id,
  }: {
    order_id: string;
  }): Promise<OrderProductEntity[]> {
    return await this.OrderProductRepository.deleteMany({ order_id });
  }
}
