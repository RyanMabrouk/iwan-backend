import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NewReviewDto, QueryReviewDto, UpdateReviewDto } from './dto';
import { ReviewRepository } from './infrastructure/repository';
import { ReviewEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { UsersService } from 'src/app/modules/users/user.service';
import { RolesEnum } from 'src/types/other/enums.types';

@Injectable()
export class ReviewService {
  constructor(
    private readonly repo: ReviewRepository,
    private readonly usersService: UsersService,
  ) {}

  async findMany(query: QueryReviewDto): Promise<ReviewEntity[]> {
    return await this.repo.findMany(query);
  }

  async createOne(payload: NewReviewDto): Promise<ReviewEntity> {
    const review = await this.repo.findOne({
      book_id: payload.book_id,
      user_id: payload.user_id,
    });
    if (review) {
      throw new ForbiddenException(ERRORS('Review already exists!'));
    }
    const entity = await this.repo.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(id: string, payload: UpdateReviewDto): Promise<ReviewEntity> {
    const entity = await this.repo.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne({
    id,
    user_id,
  }: {
    id: string;
    user_id: string;
  }): Promise<ReviewEntity> {
    const entity = await this.repo.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    const user = await this.usersService.findOne({ id: user_id });
    if (entity.user_id !== user_id && !user.roles.includes(RolesEnum.ADMIN)) {
      throw new ForbiddenException(ERRORS('Unauthorized'));
    }
    return entity;
  }
}
