import { QueryDto } from './query.dto';
import { InfinityPaginationQueryType } from 'src/types/other/InfinityPaginationQueryType';
import { IDb } from 'src/app/database/types/IDb';
export declare class QueryDtoWithPagination<EntityFilterKeys extends `${keyof IDb}.${string}`> extends QueryDto<EntityFilterKeys> implements InfinityPaginationQueryType<EntityFilterKeys> {
    page: number;
    limit: number;
}
