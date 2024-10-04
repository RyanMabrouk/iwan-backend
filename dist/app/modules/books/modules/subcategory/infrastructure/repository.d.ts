import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { SubcategoryEntity, KyselySubcategoryEntity, NewSubcategory, UpdateSubcategory } from './entity';
export declare class SubcategoryRepository implements GenericRepository<KyselySubcategoryEntity, UpdateSubcategory, never> {
    private readonly trx;
    constructor(trx: ITransaction);
    findMany(): Promise<SubcategoryEntity[]>;
    updateOne(args: {
        id: string;
    } & {
        payload: UpdateSubcategory;
    }): Promise<SubcategoryEntity | null>;
    deleteOne({ id }: {
        id: string;
    }): Promise<SubcategoryEntity | null>;
    createOne(payload: NewSubcategory): Promise<SubcategoryEntity | null>;
}
