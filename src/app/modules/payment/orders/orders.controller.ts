import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthenticatedUser } from 'src/app/auth/AuthUser';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { OrderEntity } from './infrastructure/entity/entity';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';
import { ITransaction } from 'src/app/database/types/transaction';
import { CreateCancelOrderDto, CreateOrderDto } from './dto/create.dto';
import { OrdersService } from './orders.service';
import { QueryOrderDto } from './dto/query.dto';
import { UpdateOrderDto } from './dto/update.dto';

@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async getMany(
    @Query() query: QueryOrderDto,
  ): Promise<InfinityPaginationResultType<OrderEntity>> {
    return this.service.findManyWithPagination(query);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    return this.service.findOne({ id });
  }

  @Post()
  async create(
    @Body() payload: CreateOrderDto,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<OrderEntity> {
    const res = await this.service.createOne({
      payload,
      user_id: userJwt.sub,
    });
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const res = await this.service.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id/cancel')
  async cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateCancelOrderDto,
  ): Promise<OrderEntity> {
    const res = await this.service.cancelOrder({ id, payload: body });
    this.trx.commit();
    return res;
  }

  @Patch(':id/confirm')
  async confirm(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    const res = await this.service.confirmOrder({ id });
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<OrderEntity> {
    const res = this.service.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
