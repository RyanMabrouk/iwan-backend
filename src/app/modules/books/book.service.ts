import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BookRepository } from './infrastructure/repositories/repository';
import { QueryBookDto } from './dto/query.dto';
import { UpdateBookDto } from './dto/update.dto';
import { BookFactory } from './factory/factory';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { BookEntity, IBookPopulated } from './infrastructure/entity/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { CreateBookDto } from './dto/create.dto';
import { NewBookCategory } from './infrastructure/entity/bookCategories';
import { NewBookSubcategory } from './infrastructure/entity/bookSubcategories';

@Injectable()
export class BooksService {
  constructor(
    private readonly repository: BookRepository,
    private readonly factory: BookFactory,
  ) {}

  async findManyWithPagination(
    query: QueryBookDto,
  ): Promise<InfinityPaginationResultType<IBookPopulated>> {
    return this.repository.findManyWithPagination(query);
  }

  async findOne({ id }: { id: string }): Promise<IBookPopulated> {
    const user = await this.repository.findOne({ id });
    if (user === null) {
      throw new NotFoundException(ERRORS('Book not found'));
    }
    return user;
  }

  async updateOne({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateBookDto & {
      points_balance?: number;
    };
  }): Promise<BookEntity> {
    const oldEntity = await this.findOne({ id });
    this.factory.createFromEntity({ ...oldEntity, ...payload });
    const updatedEntity = await this.repository.updateOne({
      id,
      payload,
    });
    if (!updatedEntity) {
      throw new NotFoundException(ERRORS('Book not found'));
    }
    return updatedEntity;
  }

  async createOne({
    payload,
  }: {
    payload: CreateBookDto;
  }): Promise<BookEntity> {
    const { categories_ids, subcategories_ids, ...rest } = payload;
    this.factory.createFromEntity(rest);
    const createdEntity = await this.repository.createOne(rest);
    if (!createdEntity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    if (categories_ids) {
      this.addCategoryToBook(
        categories_ids.map((category_id) => ({
          category_id,
          book_id: createdEntity.id,
        })),
      );
    }
    if (subcategories_ids) {
      this.addSubcategoryToBook(
        subcategories_ids.map((subcategory_id) => ({
          subcategory_id,
          book_id: createdEntity.id,
        })),
      );
    }
    return createdEntity;
  }

  async deleteOne({ id }: { id: string }): Promise<BookEntity> {
    const deletedEntity = await this.repository.deleteOne({ id });
    if (!deletedEntity) {
      throw new NotFoundException(ERRORS('Book not found'));
    }
    return deletedEntity;
  }

  async addCategoryToBook(payload: NewBookCategory[]) {
    const res = await this.repository.addCategoryToBook(payload);
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to add category to book'),
      );
    }
    return res;
  }

  async addSubcategoryToBook(payload: NewBookSubcategory[]) {
    const res = await this.repository.addSubcategoryToBook(payload);
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to add subcategory to book'),
      );
    }
    return res;
  }

  async removeCategoryFromBook({
    book_id,
    category_id,
  }: {
    book_id: string;
    category_id: string;
  }) {
    const res = await this.repository.removeCategoryFromBook({
      book_id,
      category_id,
    });
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to remove category from book'),
      );
    }
    return res;
  }

  async removeSubcategoryFromBook({
    book_id,
    subcategory_id,
  }: {
    book_id: string;
    subcategory_id: string;
  }) {
    const res = await this.repository.removeSubcategoryFromBook({
      book_id,
      subcategory_id,
    });
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to remove subcategory from book'),
      );
    }
    return res;
  }
}
