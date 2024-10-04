import { NewCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryRepository } from './infrastructure/repository';
import { CategoryEntity } from './infrastructure/entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    findMany(): Promise<CategoryEntity[]>;
    createOne(payload: NewCategoryDto): Promise<CategoryEntity>;
    updateOne(id: string, payload: UpdateCategoryDto): Promise<CategoryEntity>;
    deleteOne(id: string): Promise<CategoryEntity>;
}
