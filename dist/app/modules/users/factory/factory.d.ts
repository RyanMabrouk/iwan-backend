import { EntityFactory } from '../../../shared/types/EntityFactory';
import { User } from '../domain/domain';
import { NewUser } from '../infrastructure/entity/entity';
export declare class UserFactory implements EntityFactory<NewUser, User> {
    createFromEntity(entity: NewUser): User;
}
