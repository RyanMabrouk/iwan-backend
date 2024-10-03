import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewWriterDto, UpdateWriterDto } from './dto';
import { WriterRepository } from './infrastructure/repository';
import { WriterEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class WriterService {
  constructor(private readonly WriterRepository: WriterRepository) {}

  async findMany(): Promise<WriterEntity[]> {
    return await this.WriterRepository.findMany();
  }

  async createOne(payload: NewWriterDto): Promise<WriterEntity> {
    const entity = await this.WriterRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(id: string, payload: UpdateWriterDto): Promise<WriterEntity> {
    const entity = await this.WriterRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<WriterEntity> {
    const entity = await this.WriterRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
