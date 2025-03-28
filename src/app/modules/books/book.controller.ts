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
import { IsPublic } from 'src/app/auth/IsPublic.decorator';
import { AuthenticatedUser } from 'src/app/auth/AuthUser.decorator';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';

@Controller({
  path: 'books',
})
export class BooksController {
  constructor(
    private readonly service: BooksService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async getMany(
    @Query() query: QueryBookDto,
    @AuthenticatedUser() userJwt?: ITokenPayload,
  ): Promise<InfinityPaginationResultType<IBookPopulated>> {
    return this.service.findManyWithPagination(query, userJwt?.sub);
  }

  @IsPublic()
  @Get('slugs')
  async getSlugs(): Promise<
    {
      slug: string;
    }[]
  > {
    return await this.service.findSlugs();
  }

  @IsPublic()
  @Get(':id')
  async get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthenticatedUser() userJwt?: ITokenPayload,
  ): Promise<IBookPopulated> {
    return this.service.findOne({ id, user_id: userJwt?.sub });
  }

  @IsPublic()
  @Get('/slug/:slug')
  async getBySlug(
    @Param('slug') slug: string,
    @AuthenticatedUser() userJwt?: ITokenPayload,
  ): Promise<IBookPopulated> {
    return this.service.findOne({ slug, user_id: userJwt?.sub });
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
    const res = await this.service.addCategoryToBook([
      { category_id, book_id },
    ]);
    this.trx.commit();
    return res;
  }

  @Post(':book_id/subcategories/:subcategory_id')
  async addSubcategoryToBook(
    @Param('book_id') book_id: string,
    @Param('category_id') subcategory_id: string,
  ) {
    const res = await this.service.addSubcategoryToBook([
      { subcategory_id, book_id },
    ]);
    this.trx.commit();
    return res;
  }

  @Delete(':book_id/categories/:category_id')
  async removeCategoryFromBook(
    @Param('book_id') book_id: string,
    @Param('category_id') category_id: string,
  ) {
    const res = await this.service.removeCategoryFromBook({
      book_id,
      category_id,
    });
    this.trx.commit();
    return res;
  }

  @Delete(':book_id/subcategories/:subcategory_id')
  async removeSubcategoryFromBook(
    @Param('book_id') book_id: string,
    @Param('subcategory_id') subcategory_id: string,
  ) {
    const res = await this.service.removeSubcategoryFromBook({
      book_id,
      subcategory_id,
    });
    this.trx.commit();
    return res;
  }
}
