import { NewCoverType, UpdateCoverType } from './infrastructure/entity';
export declare class NewCoverTypeDto implements NewCoverType {
    name: string;
}
export declare class UpdateCoverTypeDto implements UpdateCoverType {
    name?: string;
}
