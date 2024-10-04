import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryBookKeys } from '../infrastructure/entity/entity';

export class QueryBookDto extends QueryDtoWithPagination<IQueryBookKeys> {}
