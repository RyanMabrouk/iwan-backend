import { UserRepository } from './infrastructure/repositories/repository';
import { QueryUserDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update.dto';
import { UserFactory } from './factory/factory';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { UserEntity } from './infrastructure/entity/entity';
export declare class UsersService {
    private readonly repository;
    private readonly factory;
    constructor(repository: UserRepository, factory: UserFactory);
    findManyWithPagination(query: QueryUserDto): Promise<InfinityPaginationResultType<UserEntity>>;
    findOne({ id }: {
        id: string;
    }): Promise<UserEntity>;
    updateOne({ id, payload, }: {
        id: string;
        payload: UpdateUserDto & {
            points_balance?: number;
        };
    }): Promise<UserEntity>;
}
