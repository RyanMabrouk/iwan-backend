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
import { NewShareHouseDto, UpdateShareHouseDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { ShareHouseEntity } from './infrastructure/entity';
import { ShareHouseService } from './shareHouse.service';

@Controller('share_houses')
export class ShareHouseController {
  constructor(
    private readonly WriterService: ShareHouseService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async findMany(): Promise<ShareHouseEntity[]> {
    return this.WriterService.findMany();
  }

  @Post()
  async createOne(
    @Body() payload: NewShareHouseDto,
  ): Promise<ShareHouseEntity> {
    const res = await this.WriterService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateShareHouseDto,
  ): Promise<ShareHouseEntity> {
    const res = await this.WriterService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<ShareHouseEntity> {
    const res = this.WriterService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
