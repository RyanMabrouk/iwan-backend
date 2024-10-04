import { UpdateBookDto } from '../../dto/update.dto';
import { QueryBookDto } from '../../dto/query.dto';
import { BookEntity, KyselyBookEntity, NewBook, IBookPopulated } from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { NewBookCategory } from '../entity/bookCategories';
import { NewBookSubcategory } from '../entity/bookSubcategories';
export declare class BookRepository implements GenericRepository<KyselyBookEntity, UpdateBookDto, QueryBookDto> {
    private readonly trx;
    constructor(trx: ITransaction);
    findOne({ id }: {
        id: string;
    }): Promise<IBookPopulated | null>;
    findManyWithPagination(query: QueryBookDto): Promise<InfinityPaginationResultType<IBookPopulated>>;
    updateOne(args: {
        id: string;
    } & {
        payload: UpdateBookDto;
    }): Promise<BookEntity | null>;
    deleteOne({ id }: {
        id: string;
    }): Promise<BookEntity | null>;
    createOne(payload: NewBook): Promise<BookEntity | null>;
    addCategoryToBook(payload: NewBookCategory): Promise<{
        book_id: string;
        category_id: string;
    } | null>;
    addSubcategoryToBook(payload: NewBookSubcategory): Promise<{
        book_id: string;
        subcategory_id: string;
    } | null>;
    removeCategoryFromBook({ book_id, category_id, }: {
        book_id: string;
        category_id: string;
    }): Promise<{
        book_id: string;
        category_id: string;
    } | null>;
    removeSubcategoryFromBook({ book_id, subcategory_id, }: {
        book_id: string;
        subcategory_id: string;
    }): Promise<{
        book_id: string;
        subcategory_id: string;
    } | null>;
}
