import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewReviewDto, QueryReviewDto, UpdateReviewDto } from './dto';
import { ReviewRepository } from './infrastructure/repository';
import { ReviewEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class ReviewService {
  constructor(private readonly categoryRepository: ReviewRepository) {}

  async findMany(query: QueryReviewDto): Promise<ReviewEntity[]> {
    return await this.categoryRepository.findMany(query);
  }

  async createOne(payload: NewReviewDto): Promise<ReviewEntity> {
    const entity = await this.categoryRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(id: string, payload: UpdateReviewDto): Promise<ReviewEntity> {
    const entity = await this.categoryRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<ReviewEntity> {
    const entity = await this.categoryRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
