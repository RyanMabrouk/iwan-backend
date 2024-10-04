import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { WriterEntity, KyselyWriterEntity, NewWriter, UpdateWriter } from './entity';
export declare class WriterRepository implements GenericRepository<KyselyWriterEntity, UpdateWriter, never> {
    private readonly trx;
    constructor(trx: ITransaction);
    findMany(): Promise<WriterEntity[]>;
    updateOne(args: {
        id: string;
    } & {
        payload: UpdateWriter;
    }): Promise<WriterEntity | null>;
    deleteOne({ id }: {
        id: string;
    }): Promise<WriterEntity | null>;
    createOne(payload: NewWriter): Promise<WriterEntity | null>;
}
