import { EntityFactory } from '../../../shared/types/EntityFactory';
import { Book } from '../domain/domain';
import { NewBook } from '../infrastructure/entity/entity';
export declare class BookFactory implements EntityFactory<NewBook, Book> {
    createFromEntity(entity: NewBook): Book;
}
