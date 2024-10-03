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
import { NewWriterDto, UpdateWriterDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { WriterEntity } from './infrastructure/entity';
import { WriterService } from './writer.service';

@Controller('writers')
export class WriterController {
  constructor(
    private readonly WriterService: WriterService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async findMany(): Promise<WriterEntity[]> {
    return this.WriterService.findMany();
  }

  @Post()
  async createOne(@Body() payload: NewWriterDto): Promise<WriterEntity> {
    const res = await this.WriterService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateWriterDto,
  ): Promise<WriterEntity> {
    const res = await this.WriterService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<WriterEntity> {
    const res = this.WriterService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
