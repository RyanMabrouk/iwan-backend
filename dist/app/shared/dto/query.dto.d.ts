import { SortDto } from './sort.dto';
import { SearchDto } from './search.dto';
import { IDb } from 'src/app/database/types/IDb';
export type FilterType<EntityFilterKeys extends `${keyof IDb}.${string}`> = {
    [K in EntityFilterKeys]?: SearchDto[];
};
export declare class QueryDto<EntityFilterKeys extends `${keyof IDb}.${string}`> {
    sort?: SortDto<EntityFilterKeys>;
    filters?: FilterType<EntityFilterKeys>;
    search?: FilterType<EntityFilterKeys>;
}
