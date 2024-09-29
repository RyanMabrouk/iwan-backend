import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, Max } from 'class-validator';
import { QueryDto } from './query.dto';
import { InfinityPaginationQueryType } from 'src/types/other/InfinityPaginationQueryType';
import { IDb } from 'src/app/database/types/IDb';

export class QueryDtoWithPagination<
    EntityFilterKeys extends `${keyof IDb}.${string}`,
  >
  extends QueryDto<EntityFilterKeys>
  implements InfinityPaginationQueryType<EntityFilterKeys>
{
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsPositive()
  page!: number;

  @Transform(({ value }) => (value ? Number(value) : 20))
  @IsNumber()
  @IsPositive()
  @Max(50)
  limit!: number;
}
