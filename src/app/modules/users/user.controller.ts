import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update.dto';
import { QueryUserDto } from './dto/query.dto';
import { UsersService } from './user.service';
import { ITransaction } from '../../database/types/transaction';
import { AuthenticatedUser } from 'src/app/auth/AuthUser.decorator';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { UserEntity } from './infrastructure/entity/entity';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';

@Controller({
  path: 'users',
})
export class UsersController {
  constructor(
    private readonly service: UsersService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Get()
  async getMany(
    @Query() query: QueryUserDto,
  ): Promise<InfinityPaginationResultType<UserEntity>> {
    return this.service.findManyWithPagination(query);
  }

  @Get('me')
  async getMe(
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<UserEntity> {
    return await this.service.findOne({
      id: userJwt.sub,
    });
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.service.findOne({ id });
  }

  @Patch('me')
  async patchMe(
    @AuthenticatedUser() userJwt: ITokenPayload,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    const updateEntity = await this.service.updateOne({
      id: userJwt.sub,
      payload: body,
    });
    this.trx.commit();
    return updateEntity;
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserEntity> {
    const updateEntity = await this.service.updateOne({
      id,
      payload: body,
    });
    this.trx.commit();
    return updateEntity;
  }
}
