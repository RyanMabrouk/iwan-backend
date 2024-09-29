import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortDto } from './sort.dto';
import { SearchDto } from './search.dto';
import { IDb } from 'src/app/database/types/IDb';

export type FilterType<EntityFilterKeys extends `${keyof IDb}.${string}`> = {
  [K in EntityFilterKeys]?: SearchDto[];
};

export class QueryDto<EntityFilterKeys extends `${keyof IDb}.${string}`> {
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @Type(() => SortDto)
  sort?: SortDto<EntityFilterKeys>;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  filters?: FilterType<EntityFilterKeys>;

  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  search?: FilterType<EntityFilterKeys>;
}
