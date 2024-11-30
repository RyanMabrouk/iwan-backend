import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryBookKeys } from '../infrastructure/entity/entity';
import { Type } from 'class-transformer';

class ExtraBookFiltersDto {
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  most_sold?: 'asc' | 'desc';

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  categories_ids?: string[];

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  subcategories_ids?: string[];
}

export class QueryBookDto extends QueryDtoWithPagination<IQueryBookKeys> {
  @IsOptional()
  @ValidateNested()
  @Type(() => ExtraBookFiltersDto)
  extra_filters?: ExtraBookFiltersDto;
}
