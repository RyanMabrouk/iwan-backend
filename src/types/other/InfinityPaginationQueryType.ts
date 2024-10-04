import { ComparisonOperator } from 'kysely';
export interface InfinityPaginationQueryType<
  EntityFilterKeys extends string | number | symbol,
> {
  page?: number;
  limit?: number;
  sort?: {
    order: 'asc' | 'desc';
    orderBy: EntityFilterKeys;
  };
  filters?: {
    [key in EntityFilterKeys]?: {
      operator: ComparisonOperator;
      value: string | null | string[];
    }[];
  };
  search?: {
    [key in EntityFilterKeys]?: {
      operator: ComparisonOperator;
      value: string | null | string[];
    }[];
  };
}
