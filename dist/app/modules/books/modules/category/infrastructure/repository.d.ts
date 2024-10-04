import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { CategoryEntity, KyselyCategoryEntity, NewCategory, UpdateCategory } from './entity';
export declare class CategoryRepository implements GenericRepository<KyselyCategoryEntity, UpdateCategory, never> {
    private readonly trx;
    constructor(trx: ITransaction);
    findMany(): Promise<CategoryEntity[]>;
    updateOne(args: {
        id: string;
    } & {
        payload: UpdateCategory;
    }): Promise<CategoryEntity | null>;
    deleteOne({ id }: {
        id: string;
    }): Promise<CategoryEntity | null>;
    createOne(payload: NewCategory): Promise<CategoryEntity | null>;
}
