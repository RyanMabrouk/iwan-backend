import { NewWriter, UpdateWriter } from './infrastructure/entity';
export declare class NewWriterDto implements NewWriter {
    name: string;
}
export declare class UpdateWriterDto implements UpdateWriter {
    name?: string;
}
