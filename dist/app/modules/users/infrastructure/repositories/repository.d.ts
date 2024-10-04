import { UpdateUserDto } from '../../dto/update.dto';
import { QueryUserDto } from '../../dto/query.dto';
import { UserEntity, KyselyUserEntity } from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { ITransaction } from 'src/app/database/types/transaction';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
export declare class UserRepository implements GenericRepository<KyselyUserEntity, UpdateUserDto, QueryUserDto> {
    private readonly trx;
    constructor(trx: ITransaction);
    findOne({ user_id }: {
        user_id: string;
    }): Promise<UserEntity | null>;
    findManyWithPagination(query: QueryUserDto): Promise<InfinityPaginationResultType<UserEntity>>;
    updateOne(args: {
        user_id: string;
    } & {
        payload: UpdateUserDto;
    }): Promise<UserEntity | null>;
}
