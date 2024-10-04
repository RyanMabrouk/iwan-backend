import { QueryDtoWithPagination } from '../../../shared/dto/QueryDtoWithPagination.dto';
import { IQueryUserKeys } from '../infrastructure/entity/entity';

export class QueryUserDto extends QueryDtoWithPagination<IQueryUserKeys> {}
