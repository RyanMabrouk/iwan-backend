import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateBookDto } from './dto/update.dto';
import { QueryBookDto } from './dto/query.dto';
import { BooksService } from './book.service';
import { ITransaction } from '../../database/types/transaction';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { BookEntity, IBookPopulated } from './infrastructure/entity/entity';
import { CreateBookDto } from './dto/create.dto';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly service: BooksService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async getMany(
    @Query() query: QueryBookDto,
  ): Promise<InfinityPaginationResultType<IBookPopulated>> {
    return this.service.findManyWithPagination(query);
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<IBookPopulated> {
    return this.service.findOne({ id });
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateBookDto,
  ): Promise<BookEntity> {
    const updateEntity = await this.service.updateOne({
      id,
      payload: body,
    });
    this.trx.commit();
    return updateEntity;
  }

  @Post()
  async post(@Body() body: CreateBookDto): Promise<BookEntity> {
    const createdEntity = await this.service.createOne({
      payload: body,
    });
    this.trx.commit();
    return createdEntity;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<BookEntity> {
    const deletedEntity = await this.service.deleteOne({ id });
    this.trx.commit();
    return deletedEntity;
  }

  @Post(':book_id/categories/:category_id')
  async addCategoryToBook(
    @Param('book_id') book_id: string,
    @Param('category_id') category_id: string,
  ) {
    return this.service.addCategoryToBook({ category_id, book_id });
  }

  @Post(':book_id/subcategories/:subcategory_id')
  async addSubcategoryToBook(
    @Param('book_id') book_id: string,
    @Param('category_id') subcategory_id: string,
  ) {
    return this.service.addSubcategoryToBook({ subcategory_id, book_id });
  }

  @Delete(':book_id/categories/:category_id')
  async removeCategoryFromBook(
    @Param('book_id') book_id: string,
    @Param('category_id') category_id: string,
  ) {
    return this.service.removeCategoryFromBook({ book_id, category_id });
  }

  @Delete(':book_id/subcategories/:subcategory_id')
  async removeSubcategoryFromBook(
    @Param('book_id') book_id: string,
    @Param('subcategory_id') subcategory_id: string,
  ) {
    return this.service.removeSubcategoryFromBook({
      book_id,
      subcategory_id,
    });
  }
}
