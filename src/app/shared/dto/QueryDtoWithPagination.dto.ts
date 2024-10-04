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
  @IsNumber()
  @IsPositive()
  page = 1;

  @IsNumber()
  @IsPositive()
  @Max(50)
  limit = 20;
}
