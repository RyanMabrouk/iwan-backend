import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryRepository } from './infrastructure/repository';
import { CategoryEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findMany(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findMany();
  }

  async createOne(payload: NewCategoryDto): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
