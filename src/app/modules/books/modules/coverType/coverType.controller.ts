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
import { CoverTypeService } from './coverType.service';
import { NewCoverTypeDto, UpdateCoverTypeDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { CoverTypeEntity } from './infrastructure/entity';

@Controller('cover_types')
export class CoverTypeController {
  constructor(
    private readonly CoverTypeService: CoverTypeService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async findMany(): Promise<CoverTypeEntity[]> {
    return this.CoverTypeService.findMany();
  }

  @Post()
  async createOne(@Body() payload: NewCoverTypeDto): Promise<CoverTypeEntity> {
    const res = await this.CoverTypeService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateCoverTypeDto,
  ): Promise<CoverTypeEntity> {
    const res = await this.CoverTypeService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<CoverTypeEntity> {
    const res = this.CoverTypeService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
