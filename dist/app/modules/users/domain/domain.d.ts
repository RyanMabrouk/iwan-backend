import { AggregateRoot } from '@nestjs/cqrs';
import { NewUser } from '../infrastructure/entity/entity';
export declare class User extends AggregateRoot {
    readonly data: NewUser;
    constructor(entity: NewUser);
}
