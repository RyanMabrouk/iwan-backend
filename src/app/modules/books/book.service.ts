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
import { Book } from './domain/domain';

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
    const { categories_ids, subcategories_ids, ...rest } = payload;
    const oldEntity = await this.findOne({ id });
    this.factory.createFromEntity({ ...oldEntity, ...rest });
    const updatedEntity = await this.repository.updateOne({
      id,
      payload: rest,
    });

    if (!updatedEntity) {
      throw new NotFoundException(ERRORS('Book not found'));
    }
    if (categories_ids) {
      await Promise.all(
        oldEntity.categories.map((category) =>
          this.removeCategoryFromBook({
            book_id: id,
            category_id: category.id,
          }),
        ),
      );
      await this.addCategoryToBook(
        categories_ids.map((category_id) => ({
          category_id,
          book_id: id,
        })),
      );
    }
    if (subcategories_ids) {
      await Promise.all(
        oldEntity.subcategories.map((subcategory) =>
          this.removeSubcategoryFromBook({
            book_id: id,
            subcategory_id: subcategory.id,
          }),
        ),
      );
      await this.addSubcategoryToBook(
        subcategories_ids.map((subcategory_id) => ({
          subcategory_id,
          book_id: id,
        })),
      );
    }
    return updatedEntity;
  }

  async decrementStock({ id, quantity }: { id: string; quantity: number }) {
    const book = await this.findOne({ id });
    const old_stock = book.stock;
    const new_quantity = old_stock - quantity;
    if (new_quantity < 0) {
      throw new InternalServerErrorException(ERRORS('Not enough stock'));
    }
    const updatedEntity = await this.repository.updateOne({
      id,
      payload: {
        stock: old_stock - quantity,
      },
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
    const book = this.factory.createFromEntity({
      ...rest,
      price_after_discount: parseFloat(
        Book.calculatePriceAfterDiscount({
          price: parseFloat(rest.price?.toFixed(2)),
          discount: parseFloat(rest.discount?.toFixed(2)),
          discount_type: rest.discount_type,
        })?.toFixed(2),
      ),
    });
    const createdEntity = await this.repository.createOne(book.data);
    if (!createdEntity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    if (categories_ids && categories_ids.length > 0) {
      await this.addCategoryToBook(
        categories_ids.map((category_id) => ({
          category_id,
          book_id: createdEntity.id,
        })),
      );
    }
    if (subcategories_ids && subcategories_ids.length > 0) {
      await this.addSubcategoryToBook(
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
    if (payload.length === 0) return [];
    const res = await this.repository.addCategoryToBook(payload);
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to add category to book'),
      );
    }
    return res;
  }

  async addSubcategoryToBook(payload: NewBookSubcategory[]) {
    if (payload.length === 0) return [];
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
