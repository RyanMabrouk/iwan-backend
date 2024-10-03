import { NewWriterDto, UpdateWriterDto } from './dto';
import { WriterRepository } from './infrastructure/repository';
import { WriterEntity } from './infrastructure/entity';
export declare class WriterService {
    private readonly WriterRepository;
    constructor(WriterRepository: WriterRepository);
    findMany(): Promise<WriterEntity[]>;
    createOne(payload: NewWriterDto): Promise<WriterEntity>;
    updateOne(id: string, payload: UpdateWriterDto): Promise<WriterEntity>;
    deleteOne(id: string): Promise<WriterEntity>;
}
