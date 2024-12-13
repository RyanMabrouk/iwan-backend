import { QueryDtoWithPagination } from 'src/app/shared/dto/QueryDtoWithPagination.dto';
import { IQueryOfferKeys } from '../infrastructure/entity';

export class QueryOfferDto extends QueryDtoWithPagination<IQueryOfferKeys> {}
