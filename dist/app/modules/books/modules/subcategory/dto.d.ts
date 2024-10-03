import { NewSubcategory, UpdateSubcategory } from './infrastructure/entity';
export declare class NewSubcategoryDto implements NewSubcategory {
    name: string;
    category_id: string;
}
export declare class UpdateSubcategoryDto implements UpdateSubcategory {
    name?: string;
}
