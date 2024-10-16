import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './infrastructure/repositories/repository';
import { UpdateEventDto } from './dto/update.dto';
import { EventFactory } from './factory/factory';
import { EventEntity, IEventPopulated } from './infrastructure/entity/entity';
import { ERRORS } from 'src/assets/constants/errors';
import { CreateEventDto } from './dto/create.dto';
import { NewEventBooks } from './infrastructure/entity/eventBooks';

@Injectable()
export class EventsService {
  constructor(
    private readonly repository: EventRepository,
    private readonly factory: EventFactory,
  ) {}

  async findMany(): Promise<EventEntity[]> {
    return this.repository.findMany();
  }

  async findOne({ id }: { id: string }): Promise<IEventPopulated> {
    const user = await this.repository.findOne({ id });
    if (user === null) {
      throw new NotFoundException(ERRORS('Event not found'));
    }
    return user;
  }

  async updateOne({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateEventDto;
  }): Promise<EventEntity> {
    const { books_ids, ...rest } = payload;
    const oldEntity = await this.findOne({ id });
    this.factory.createFromEntity({ ...oldEntity, ...rest });
    const updatedEntity = await this.repository.updateOne({
      id,
      payload: rest,
    });

    if (!updatedEntity) {
      throw new NotFoundException(ERRORS('Event not found'));
    }
    if (books_ids) {
      await Promise.all(
        oldEntity.books.map((book) =>
          this.removeCategoryFromEvent({
            event_id: id,
            book_id: book.id,
          }),
        ),
      );
      await this.addBooksToEvent(
        books_ids.map((book_id) => ({
          book_id,
          event_id: id,
        })),
      );
    }
    return updatedEntity;
  }

  async createOne({
    payload,
  }: {
    payload: CreateEventDto;
  }): Promise<EventEntity> {
    const { books_ids, ...rest } = payload;
    const Event = this.factory.createFromEntity({
      ...rest,
    });
    const createdEntity = await this.repository.createOne(Event.data);
    if (!createdEntity) {
      throw new InternalServerErrorException(ERRORS('Unexpected error!'));
    }
    if (books_ids && books_ids.length > 0) {
      await this.addBooksToEvent(
        books_ids.map((book_id) => ({
          book_id,
          event_id: createdEntity.id,
        })),
      );
    }
    return createdEntity;
  }

  async deleteOne({ id }: { id: string }): Promise<EventEntity> {
    const deletedEntity = await this.repository.deleteOne({ id });
    if (!deletedEntity) {
      throw new NotFoundException(ERRORS('Event not found'));
    }
    return deletedEntity;
  }

  async addBooksToEvent(payload: NewEventBooks[]) {
    if (payload.length === 0) return [];
    const res = await this.repository.addBooksToEvent(payload);
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to add book to event'),
      );
    }
    return res;
  }

  async removeCategoryFromEvent({
    event_id,
    book_id,
  }: {
    event_id: string;
    book_id: string;
  }) {
    const res = await this.repository.removeBooksFromEvent({
      event_id,
      book_id,
    });
    if (!res) {
      throw new InternalServerErrorException(
        ERRORS('Failed to remove book from event'),
      );
    }
    return res;
  }
}
