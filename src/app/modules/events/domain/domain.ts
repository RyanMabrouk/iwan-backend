import { AggregateRoot } from '@nestjs/cqrs';
import { NewEvent } from '../infrastructure/entity/entity';

export class Event extends AggregateRoot {
  readonly data: NewEvent;
  constructor(entity: NewEvent) {
    super();
    this.data = entity;
  }
}
