import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewCoverTypeDto, UpdateCoverTypeDto } from './dto';
import { CoverTypeRepository } from './infrastructure/repository';
import { CoverTypeEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class CoverTypeService {
  constructor(private readonly CoverTypeRepository: CoverTypeRepository) {}

  async findMany(): Promise<CoverTypeEntity[]> {
    return await this.CoverTypeRepository.findMany();
  }

  async createOne(payload: NewCoverTypeDto): Promise<CoverTypeEntity> {
    const entity = await this.CoverTypeRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateCoverTypeDto,
  ): Promise<CoverTypeEntity> {
    const entity = await this.CoverTypeRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<CoverTypeEntity> {
    const entity = await this.CoverTypeRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
