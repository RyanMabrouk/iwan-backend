import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAddressDto } from './dto';
import { AddressRepository } from './infrastructure/repository';
import { AddressEntity, NewAddress } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';

@Injectable()
export class AddressService {
  constructor(private readonly AddressRepository: AddressRepository) {}

  async findMany(): Promise<AddressEntity[]> {
    return await this.AddressRepository.findMany();
  }

  async createOne(payload: NewAddress): Promise<AddressEntity> {
    const entity = await this.AddressRepository.createOne(payload);
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async updateOne(
    id: string,
    payload: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const entity = await this.AddressRepository.updateOne({ id, payload });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }

  async deleteOne(id: string): Promise<AddressEntity> {
    const entity = await this.AddressRepository.deleteOne({ id });
    if (!entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    return entity;
  }
}
