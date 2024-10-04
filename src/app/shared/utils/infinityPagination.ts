import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';

export const infinityPagination = <T>(
  data: T[],
  options: {
    total_count: number;
    limit: number | undefined;
    page: number | undefined;
  },
): InfinityPaginationResultType<T> => {
  options.limit = options.limit ? options.limit : 20;
  options.page = options.page ? options.page : 1;
  return {
    data,
    meta: {
      page: options.page,
      limit: options.limit,
      total_pages:
        options.total_count > 0
          ? Math.ceil(options.total_count / options.limit)
          : 0,
      has_next_page:
        options.limit === data.length &&
        options.total_count > options.limit * options.page,
      has_previous_page: options.page > 1,
      total_count: options.total_count,
    },
  };
};
