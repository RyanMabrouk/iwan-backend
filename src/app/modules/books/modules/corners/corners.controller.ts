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
import { CornersService } from './corners.service';
import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { CornerEntity } from './infrastructure/entity';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';

@Controller('corners')
export class CornersController {
  constructor(
    private readonly categoryService: CornersService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async findMany(): Promise<CornerEntity[]> {
    return this.categoryService.findMany();
  }

  @Post()
  async createOne(@Body() payload: NewCategoryDto): Promise<CornerEntity> {
    const res = await this.categoryService.createOne(payload);
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateCategoryDto,
  ): Promise<CornerEntity> {
    const res = await this.categoryService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<CornerEntity> {
    const res = this.categoryService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
