import { AggregateRoot } from '@nestjs/cqrs';
import { NewBook } from '../infrastructure/entity/entity';
export declare class Book extends AggregateRoot {
    readonly data: NewBook;
    constructor(entity: NewBook);
}
