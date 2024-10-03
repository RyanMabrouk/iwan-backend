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
import { CategoryService } from './category.service';
import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { CategoryEntity } from './infrastructure/entity';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async findMany(): Promise<CategoryEntity[]> {
    return this.categoryService.findMany();
  }

  @Post()
  async createOne(@Body() payload: NewCategoryDto): Promise<CategoryEntity> {
    const res = await this.categoryService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const res = await this.categoryService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<CategoryEntity> {
    const res = this.categoryService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
