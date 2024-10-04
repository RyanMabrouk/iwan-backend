import { SubcategoryService } from './subcategory.service';
import { NewSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { ITransaction } from 'src/app/database/types/transaction';
import { SubcategoryEntity } from './infrastructure/entity';
export declare class SubcategoryController {
    private readonly SubcategoryService;
    private readonly trx;
    constructor(SubcategoryService: SubcategoryService, trx: ITransaction);
    findMany(): Promise<SubcategoryEntity[]>;
    createOne(payload: NewSubcategoryDto): Promise<SubcategoryEntity>;
    updateOne(id: string, payload: UpdateSubcategoryDto): Promise<SubcategoryEntity>;
    deleteOne(id: string): Promise<SubcategoryEntity>;
}
