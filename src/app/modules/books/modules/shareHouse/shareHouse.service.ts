import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NewShareHouseDto, UpdateShareHouseDto } from './dto';
import { ShareHouseRepository } from './infrastructure/repository';
import { ShareHouseEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class ShareHouseService {
  constructor(private readonly ShareHouseRepository: ShareHouseRepository) {}

  async findMany(): Promise<ShareHouseEntity[]> {
    return await this.ShareHouseRepository.findMany();
  }

  async createOne(payload: NewShareHouseDto): Promise<ShareHouseEntity> {
    const entity = await this.ShareHouseRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateShareHouseDto,
  ): Promise<ShareHouseEntity> {
    const entity = await this.ShareHouseRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<ShareHouseEntity> {
    const entity = await this.ShareHouseRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
