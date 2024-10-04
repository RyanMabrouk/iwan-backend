import { NewSubcategoryDto, UpdateSubcategoryDto } from './dto';
import { SubcategoryRepository } from './infrastructure/repository';
import { SubcategoryEntity } from './infrastructure/entity';
export declare class SubcategoryService {
    private readonly SubcategoryRepository;
    constructor(SubcategoryRepository: SubcategoryRepository);
    findMany(): Promise<SubcategoryEntity[]>;
    createOne(payload: NewSubcategoryDto): Promise<SubcategoryEntity>;
    updateOne(id: string, payload: UpdateSubcategoryDto): Promise<SubcategoryEntity>;
    deleteOne(id: string): Promise<SubcategoryEntity>;
}
