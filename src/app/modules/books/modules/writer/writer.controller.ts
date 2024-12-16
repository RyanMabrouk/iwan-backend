import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
  Query,
} from '@nestjs/common';
import { NewWriterDto, UpdateWriterDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { QueryWriterDto, WriterEntity } from './infrastructure/entity';
import { WriterService } from './writer.service';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';

@Controller('writers')
export class WriterController {
  constructor(
    private readonly WriterService: WriterService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get('all')
  async findMany(): Promise<WriterEntity[]> {
    return this.WriterService.findMany();
  }

  @IsPublic()
  @Get()
  async findManyWithPagination(
    @Query() query: QueryWriterDto,
  ): Promise<InfinityPaginationResultType<WriterEntity>> {
    return this.WriterService.findManyWithPagination(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WriterEntity> {
    return this.WriterService.findOne(id);
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
