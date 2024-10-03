import { Injectable } from '@nestjs/common';
import { EntityFactory } from '../../../shared/types/EntityFactory';
import { Book } from '../domain/domain';
import { NewBook } from '../infrastructure/entity/entity';

@Injectable()
export class BookFactory implements EntityFactory<NewBook, Book> {
  createFromEntity(entity: NewBook): Book {
    return new Book(entity);
  }
}
