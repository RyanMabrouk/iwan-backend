import { AggregateRoot } from '@nestjs/cqrs';
import { NewUser } from '../infrastructure/entity/entity';

export class User extends AggregateRoot {
  readonly data: NewUser;
  constructor(entity: NewUser) {
    super();
    this.data = entity;
  }
}
