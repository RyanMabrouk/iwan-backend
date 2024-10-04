import { NewCoverTypeDto, UpdateCoverTypeDto } from './dto';
import { CoverTypeRepository } from './infrastructure/repository';
import { CoverTypeEntity } from './infrastructure/entity';
export declare class CoverTypeService {
    private readonly CoverTypeRepository;
    constructor(CoverTypeRepository: CoverTypeRepository);
    findMany(): Promise<CoverTypeEntity[]>;
    createOne(payload: NewCoverTypeDto): Promise<CoverTypeEntity>;
    updateOne(id: string, payload: UpdateCoverTypeDto): Promise<CoverTypeEntity>;
    deleteOne(id: string): Promise<CoverTypeEntity>;
}
