import { UpdateBook } from '../infrastructure/entity/entity';
import { CreateBookDto } from './create.dto';
declare const UpdateBookDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBookDto>>;
export declare class UpdateBookDto extends UpdateBookDto_base implements UpdateBook {
}
export {};
