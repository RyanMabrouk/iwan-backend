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
import { SubcategoryService } from './subcategory.service';
import { NewSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { SubcategoryEntity } from './infrastructure/entity';

@Controller('subcategories')
export class SubcategoryController {
  constructor(
    private readonly SubcategoryService: SubcategoryService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async findMany(): Promise<SubcategoryEntity[]> {
    return this.SubcategoryService.findMany();
  }

  @Post()
  async createOne(
    @Body() payload: NewSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    const res = await this.SubcategoryService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    const res = await this.SubcategoryService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<SubcategoryEntity> {
    const res = this.SubcategoryService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
