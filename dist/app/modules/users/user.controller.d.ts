import { UpdateUserDto } from './dto/update.dto';
import { QueryUserDto } from './dto/query.dto';
import { UsersService } from './user.service';
import { ITransaction } from '../../database/types/transaction';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
import { UserEntity } from './infrastructure/entity/entity';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';
export declare class UsersController {
    private readonly service;
    private readonly trx;
    constructor(service: UsersService, trx: ITransaction);
    getMany(query: QueryUserDto): Promise<InfinityPaginationResultType<UserEntity>>;
    getMe(userJwt: ITokenPayload): Promise<UserEntity>;
    get(id: string): Promise<UserEntity>;
    patchMe(userJwt: ITokenPayload, body: UpdateUserDto): Promise<UserEntity>;
    patch(id: string, body: UpdateUserDto): Promise<UserEntity>;
}
