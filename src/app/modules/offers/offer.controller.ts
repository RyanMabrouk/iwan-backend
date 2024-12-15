import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { ITransaction } from 'src/app/database/types/transaction';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { UpdateOfferDto } from './dto/update.dto';
import { QueryOfferDto } from './dto/query.dto';
import { CreateOfferDto } from './dto/create.dto';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';
import { OfferEntity } from './infrastructure/entity';
import { AuthenticatedUser } from 'src/app/auth/AuthUser.decorator';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';

@Controller({
  path: 'offers',
})
export class OfferController {
  constructor(
    private readonly service: OfferService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Post()
  async post(
    @Body() body: CreateOfferDto,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<OfferEntity> {
    const created_entity = await this.service.createOne({
      ...body,
      created_by: userJwt.sub,
    });
    this.trx.commit();
    return created_entity;
  }

  @IsPublic()
  @Get()
  async getMany(@Query() query: QueryOfferDto): Promise<OfferEntity[]> {
    return this.service.findMany(query);
  }

  @IsPublic()
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.service.findOne({ id });
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateOfferDto,
  ): Promise<OfferEntity> {
    const updated_entity = await this.service.updateOne({ id, payload: body });
    this.trx.commit();
    return updated_entity;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<OfferEntity> {
    const deleted_entity = await this.service.deleteOne({ id });
    this.trx.commit();
    return deleted_entity;
  }
}
