import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';
export declare const infinityPagination: <T>(data: T[], options: {
    total_count: number;
    limit: number | undefined;
    page: number | undefined;
}) => InfinityPaginationResultType<T>;
