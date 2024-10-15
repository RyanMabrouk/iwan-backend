import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { CornerRepository } from './infrastructure/repository';
import { CornerEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class CornersService {
  constructor(private readonly repository: CornerRepository) {}

  async findMany(): Promise<CornerEntity[]> {
    return await this.repository.findMany();
  }

  async createOne(payload: NewCategoryDto): Promise<CornerEntity> {
    const entity = await this.repository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateCategoryDto,
  ): Promise<CornerEntity> {
    const entity = await this.repository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<CornerEntity> {
    const entity = await this.repository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
