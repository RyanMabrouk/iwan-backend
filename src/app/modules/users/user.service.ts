import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './infrastructure/repositories/repository';
import { QueryUserDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UserFactory } from './factory/factory';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { UserEntity } from './infrastructure/entity/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly factory: UserFactory,
  ) {}

  async findManyWithPagination(
    query: QueryUserDto,
  ): Promise<InfinityPaginationResultType<UserEntity>> {
    return this.repository.findManyWithPagination(query);
  }

  async findOne({ id }: { id: string }): Promise<UserEntity> {
    const user = await this.repository.findOne({ user_id: id });
    if (user === null) {
      throw new NotFoundException(ERRORS('User not found'));
    }
    return user;
  }

  async updateOne({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateUserDto & {
      points_balance?: number;
    };
  }): Promise<UserEntity> {
    const oldEntity = await this.findOne({ id });
    this.factory.createFromEntity({ ...oldEntity, ...payload });
    const updatedEntity = await this.repository.updateOne({
      user_id: id,
      payload,
    });
    if (!updatedEntity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return updatedEntity;
  }
}
