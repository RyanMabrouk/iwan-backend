import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
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
    private readonly categoryService: BannersService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async findMany(): Promise<BannerEntity[]> {
    return this.categoryService.findMany();
  }

  @Post()
  async createOne(@Body() payload: NewBannerDto): Promise<BannerEntity> {
    const res = await this.categoryService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateBannerDto,
  ): Promise<BannerEntity> {
    const res = await this.categoryService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<BannerEntity> {
    const res = this.categoryService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
