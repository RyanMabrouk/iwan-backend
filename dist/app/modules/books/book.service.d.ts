import { BookRepository } from './infrastructure/repositories/repository';
import { QueryBookDto } from './dto/query.dto';
import { UpdateBookDto } from './dto/update.dto';
import { BookFactory } from './factory/factory';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { BookEntity, IBookPopulated } from './infrastructure/entity/entity';
import { CreateBookDto } from './dto/create.dto';
import { NewBookCategory } from './infrastructure/entity/bookCategories';
import { NewBookSubcategory } from './infrastructure/entity/bookSubcategories';
export declare class BooksService {
    private readonly repository;
    private readonly factory;
    constructor(repository: BookRepository, factory: BookFactory);
    findManyWithPagination(query: QueryBookDto): Promise<InfinityPaginationResultType<IBookPopulated>>;
    findOne({ id }: {
        id: string;
    }): Promise<IBookPopulated>;
    updateOne({ id, payload, }: {
        id: string;
        payload: UpdateBookDto & {
            points_balance?: number;
        };
    }): Promise<BookEntity>;
    createOne({ payload, }: {
        payload: CreateBookDto;
    }): Promise<BookEntity>;
    deleteOne({ id }: {
        id: string;
    }): Promise<BookEntity>;
    addCategoryToBook(payload: NewBookCategory): Promise<{
        book_id: string;
        category_id: string;
    }>;
    addSubcategoryToBook(payload: NewBookSubcategory): Promise<{
        book_id: string;
        subcategory_id: string;
    }>;
    removeCategoryFromBook({ book_id, category_id, }: {
        book_id: string;
        category_id: string;
    }): Promise<{
        book_id: string;
        category_id: string;
    }>;
    removeSubcategoryFromBook({ book_id, subcategory_id, }: {
        book_id: string;
        subcategory_id: string;
    }): Promise<{
        book_id: string;
        subcategory_id: string;
    }>;
}
