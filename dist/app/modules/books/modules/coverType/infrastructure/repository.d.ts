import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { CoverTypeEntity, KyselyCoverTypeEntity, NewCoverType, UpdateCoverType } from './entity';
export declare class CoverTypeRepository implements GenericRepository<KyselyCoverTypeEntity, UpdateCoverType, never> {
    private readonly trx;
    constructor(trx: ITransaction);
    findMany(): Promise<CoverTypeEntity[]>;
    updateOne(args: {
        id: string;
    } & {
        payload: UpdateCoverType;
    }): Promise<CoverTypeEntity | null>;
    deleteOne({ id }: {
        id: string;
    }): Promise<CoverTypeEntity | null>;
    createOne(payload: NewCoverType): Promise<CoverTypeEntity | null>;
}
