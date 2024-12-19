import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryBookKeys } from '../infrastructure/entity/entity';
import { Type } from 'class-transformer';
import { nationalities } from '../modules/writer/constants/countries';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

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

  @IsOptional()
  @IsIn(nationalities.map((e) => e.value), { message: TranslateDto('IsIn') })
  writer_nationality?: string;
}

export class QueryBookDto extends QueryDtoWithPagination<IQueryBookKeys> {
  @IsOptional()
  @Type(() => ExtraBookFiltersDto)
  extra_filters?: ExtraBookFiltersDto;
}
