import { QueryDtoWithPagination } from 'src/app/shared/dto/QueryDtoWithPagination.dto';
import { IQueryOrderKeys } from '../infrastructure/entity/entity';

export class QueryOrderDto extends QueryDtoWithPagination<IQueryOrderKeys> {}
