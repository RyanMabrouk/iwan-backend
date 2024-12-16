import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewWriterDto, UpdateWriterDto } from './dto';
import { WriterRepository } from './infrastructure/repository';
import { QueryWriterDto, WriterEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';

@Injectable()
export class WriterService {
  constructor(private readonly WriterRepository: WriterRepository) {}

  async findMany(): Promise<WriterEntity[]> {
    return await this.WriterRepository.findMany();
  }

  async findManyWithPagination(
    query: QueryWriterDto,
  ): Promise<InfinityPaginationResultType<WriterEntity>> {
    return await this.WriterRepository.findManyWithPagination(query);
  }

  async findOne(id: string): Promise<WriterEntity> {
    const res = await this.WriterRepository.findOne({ id });
    if (!res) {
      throw new NotFoundException(ERRORS('Writer not found!'));
    }
    return res;
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
