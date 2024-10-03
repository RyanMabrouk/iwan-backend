import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { SubcategoryRepository } from './infrastructure/repository';
import { SubcategoryEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class SubcategoryService {
  constructor(private readonly SubcategoryRepository: SubcategoryRepository) {}

  async findMany(): Promise<SubcategoryEntity[]> {
    return await this.SubcategoryRepository.findMany();
  }

  async createOne(payload: NewSubcategoryDto): Promise<SubcategoryEntity> {
    const entity = await this.SubcategoryRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateSubcategoryDto,
  ): Promise<SubcategoryEntity> {
    const entity = await this.SubcategoryRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<SubcategoryEntity> {
    const entity = await this.SubcategoryRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
