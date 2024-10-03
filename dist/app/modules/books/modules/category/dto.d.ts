import { NewCategory, UpdateCategory } from './infrastructure/entity';
export declare class NewCategoryDto implements NewCategory {
    name: string;
}
export declare class UpdateCategoryDto implements UpdateCategory {
    name?: string;
}
