import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BannersService } from './banner.service';
import { NewBannerDto, UpdateBannerDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { BannerEntity } from './infrastructure/entity';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';

@Controller('banners')
export class BannersController {
  constructor(
    private readonly service: BannersService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async findMany(): Promise<BannerEntity[]> {
    return this.service.findMany();
  }

  @IsPublic()
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<BannerEntity> {
    return this.service.findOne(id);
  }

  @Post()
  async createOne(@Body() payload: NewBannerDto): Promise<BannerEntity> {
    const res = await this.service.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateBannerDto,
  ): Promise<BannerEntity> {
    const res = await this.service.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<BannerEntity> {
    const res = this.service.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
