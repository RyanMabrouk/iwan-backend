import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NewBannerDto, UpdateBannerDto } from './dto';
import { BannerRepository } from './infrastructure/repository';
import { BannerEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class BannersService {
  constructor(private readonly repository: BannerRepository) {}

  async findMany(): Promise<BannerEntity[]> {
    return await this.repository.findMany();
  }

  async findOne(id: string): Promise<BannerEntity> {
    const res = await this.repository.findOne({ id });
    if (res === null) {
      throw new NotFoundException(ERRORS('Banner not found!'));
    }
    return res;
  }

  async createOne(payload: NewBannerDto): Promise<BannerEntity> {
    const entity = await this.repository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(id: string, payload: UpdateBannerDto): Promise<BannerEntity> {
    const entity = await this.repository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<BannerEntity> {
    const entity = await this.repository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
