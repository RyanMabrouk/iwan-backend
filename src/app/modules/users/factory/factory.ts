import { Injectable } from '@nestjs/common';
import { EntityFactory } from '../../../shared/types/EntityFactory';
import { User } from '../domain/domain';
import { NewUser } from '../infrastructure/entity/entity';

@Injectable()
export class UserFactory implements EntityFactory<NewUser, User> {
  createFromEntity(entity: NewUser): User {
    return new User(entity);
  }
}
