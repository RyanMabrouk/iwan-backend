import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryEventKeys } from '../infrastructure/entity/entity';

export class QueryEventDto extends QueryDtoWithPagination<IQueryEventKeys> {}
