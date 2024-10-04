import { CoverTypeService } from './coverType.service';
import { NewCoverTypeDto, UpdateCoverTypeDto } from './dto';
import { ITransaction } from 'src/app/database/types/transaction';
import { CoverTypeEntity } from './infrastructure/entity';
export declare class CoverTypeController {
    private readonly CoverTypeService;
    private readonly trx;
    constructor(CoverTypeService: CoverTypeService, trx: ITransaction);
    findMany(): Promise<CoverTypeEntity[]>;
    createOne(payload: NewCoverTypeDto): Promise<CoverTypeEntity>;
    updateOne(id: string, payload: UpdateCoverTypeDto): Promise<CoverTypeEntity>;
    deleteOne(id: string): Promise<CoverTypeEntity>;
}
