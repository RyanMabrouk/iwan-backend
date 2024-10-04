import { UpdateBookDto } from './dto/update.dto';
import { QueryBookDto } from './dto/query.dto';
import { BooksService } from './book.service';
import { ITransaction } from '../../database/types/transaction';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { BookEntity, IBookPopulated } from './infrastructure/entity/entity';
import { CreateBookDto } from './dto/create.dto';
export declare class BooksController {
    private readonly service;
    private readonly trx;
    constructor(service: BooksService, trx: ITransaction);
    getMany(query: QueryBookDto): Promise<InfinityPaginationResultType<IBookPopulated>>;
    get(id: string): Promise<IBookPopulated>;
    patch(id: string, body: UpdateBookDto): Promise<BookEntity>;
    post(body: CreateBookDto): Promise<BookEntity>;
    delete(id: string): Promise<BookEntity>;
    addCategoryToBook(book_id: string, category_id: string): Promise<{
        book_id: string;
        category_id: string;
    }>;
    addSubcategoryToBook(book_id: string, subcategory_id: string): Promise<{
        book_id: string;
        subcategory_id: string;
    }>;
    removeCategoryFromBook(book_id: string, category_id: string): Promise<{
        book_id: string;
        category_id: string;
    }>;
    removeSubcategoryFromBook(book_id: string, subcategory_id: string): Promise<{
        book_id: string;
        subcategory_id: string;
    }>;
}
