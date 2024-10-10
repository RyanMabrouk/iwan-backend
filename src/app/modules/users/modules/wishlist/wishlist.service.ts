import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WishlistRepository } from './infrastructure/repository';
import { WishlistEntity, NewWishlist } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { QueryBookDto } from 'src/app/modules/books/dto/query.dto';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { BookEntity } from 'src/app/modules/books/infrastructure/entity/entity';

@Injectable()
export class WishlistService {
  constructor(private readonly repository: WishlistRepository) {}

  async findManyBooksWithPagination(
    query: QueryBookDto,
    user_id: string,
  ): Promise<InfinityPaginationResultType<BookEntity>> {
    return this.repository.findManyBooksWithPagination(query, user_id);
  }

  async createOne(payload: NewWishlist): Promise<WishlistEntity> {
    const entity = await this.repository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne({
    user_id,
    book_id,
  }: {
    user_id: string;
    book_id: string;
  }): Promise<WishlistEntity> {
    const entity = await this.repository.deleteOne({ user_id, book_id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
