import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Get,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { WishlistEntity } from './infrastructure/entity';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';
import { AuthenticatedUser } from 'src/app/auth/AuthUser';
import { QueryBookDto } from 'src/app/modules/books/dto/query.dto';
import { BookEntity } from 'src/app/modules/books/infrastructure/entity/entity';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { NewWishlistDto } from './dto';

@Controller('wishlist')
export class WishlistController {
  constructor(
    private readonly service: WishlistService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get('me')
  async getMany(
    @Query() query: QueryBookDto,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<InfinityPaginationResultType<BookEntity>> {
    return this.service.findManyBooksWithPagination(query, userJwt.sub);
  }

  @Post()
  async createOne(
    @Body() payload: NewWishlistDto,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<WishlistEntity> {
    const res = await this.service.createOne({
      ...payload,
      user_id: userJwt.sub,
    });
    this.trx.commit();
    return res;
  }

  @Delete(':book_id')
  async deleteOne(
    @Param('book_id', ParseUUIDPipe) book_id: string,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<WishlistEntity> {
    const res = this.service.deleteOne({
      book_id,
      user_id: userJwt.sub,
    });
    this.trx.commit();
    return res;
  }
}
