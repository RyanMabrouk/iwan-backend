import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryBookKeys } from '../infrastructure/entity/entity';

export class QueryBookDto extends QueryDtoWithPagination<IQueryBookKeys> {
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  most_sold?: 'asc' | 'desc';

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  categories_ids?: string[];

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  subcategories_ids?: string[];
}
