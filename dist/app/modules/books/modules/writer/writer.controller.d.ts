import { NewWriterDto, UpdateWriterDto } from './dto';
import { ITransaction } from 'src/app/database/types/transaction';
import { WriterEntity } from './infrastructure/entity';
import { WriterService } from './writer.service';
export declare class WriterController {
    private readonly WriterService;
    private readonly trx;
    constructor(WriterService: WriterService, trx: ITransaction);
    findMany(): Promise<WriterEntity[]>;
    createOne(payload: NewWriterDto): Promise<WriterEntity>;
    updateOne(id: string, payload: UpdateWriterDto): Promise<WriterEntity>;
    deleteOne(id: string): Promise<WriterEntity>;
}
