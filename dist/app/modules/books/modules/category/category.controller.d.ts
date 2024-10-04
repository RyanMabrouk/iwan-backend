import { CategoryService } from './category.service';
import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { ITransaction } from 'src/app/database/types/transaction';
import { CategoryEntity } from './infrastructure/entity';
export declare class CategoryController {
    private readonly categoryService;
    private readonly trx;
    constructor(categoryService: CategoryService, trx: ITransaction);
    findMany(): Promise<CategoryEntity[]>;
    createOne(payload: NewCategoryDto): Promise<CategoryEntity>;
    updateOne(id: string, payload: UpdateCategoryDto): Promise<CategoryEntity>;
    deleteOne(id: string): Promise<CategoryEntity>;
}
