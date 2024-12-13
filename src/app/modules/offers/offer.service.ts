import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OfferRepository } from './infrastructure/repository';
import { QueryOfferDto } from './dto/query.dto';
import { UpdateOfferDto } from './dto/update.dto';
import { CreateOfferDto } from './dto/create.dto';
import { OfferDetails, OfferEntity } from './infrastructure/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { OfferBookRepository } from './modules/offerBooks/infrastructure/repository';

@Injectable()
export class OfferService {
  constructor(
    private readonly repository: OfferRepository,
    private readonly offerBookRepo: OfferBookRepository,
  ) {}

  async findMany(query: QueryOfferDto): Promise<OfferEntity[]> {
    const offers = await this.repository.findMany(query);
    return offers;
  }

  async findOne({ id }: { id: string }): Promise<OfferDetails> {
    const offer = await this.repository.findOne({ id });
    if (!offer) {
      throw new NotFoundException(ERRORS('Offer not found'));
    }
    return offer;
  }

  async updateOne({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateOfferDto;
  }): Promise<OfferEntity> {
    const { book_ids, ...rest } = payload;
    const old_entity = await this.findOne({ id });
    const new_price_before_offer =
      rest.price_before_offer ?? old_entity.price_before_offer;

    const new_price_after_offer =
      rest.price_after_offer ?? old_entity.price_after_offer;

    if (new_price_after_offer >= new_price_before_offer) {
      throw new BadRequestException(
        ERRORS('price_after_offer must be less than price_before_offer'),
      );
    }
    const updatedEntity = await this.repository.updateOne({
      id,
      payload: rest,
    });
    if (!updatedEntity) {
      throw new NotFoundException(ERRORS('Offer not found'));
    }
    if (book_ids) {
      await this.offerBookRepo.deleteMany(
        id,
        old_entity.books.map((b) => b.id),
      );
      await this.offerBookRepo.createMany(
        book_ids.map((book_id) => ({ book_id, offer_id: id })),
      );
    }

    return updatedEntity;
  }

  async deleteOne({ id }: { id: string }): Promise<OfferEntity> {
    const deletedEntity = await this.repository.deleteOne({ id });
    if (!deletedEntity) {
      throw new NotFoundException(ERRORS('Offer not found'));
    }
    return deletedEntity;
  }

  async createOne(
    payload: CreateOfferDto & { created_by: string },
  ): Promise<OfferEntity> {
    if (payload.price_after_offer >= payload.price_before_offer) {
      throw new BadRequestException(
        ERRORS('price_after_offer must be less than price_before_offer'),
      );
    }
    const { book_ids, ...rest } = payload;

    const create_entity = await this.repository.createOne(rest);
    if (!create_entity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    await this.offerBookRepo.createMany(
      book_ids.map((book_id) => ({ book_id, offer_id: create_entity.id })),
    );

    return create_entity;
  }
}
