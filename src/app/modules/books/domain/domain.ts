import { AggregateRoot } from '@nestjs/cqrs';
import { NewBook } from '../infrastructure/entity/entity';

export class Book extends AggregateRoot {
  readonly data: NewBook;
  constructor(entity: NewBook) {
    super();
    this.data = entity;
  }
}
