import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import {
  IQueryReviewKeys,
  NewReview,
  UpdateReview,
} from './infrastructure/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';
import { QueryDto } from 'src/app/shared/dto/query.dto';

export class NewReviewDto implements NewReview {
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Min(1, { message: TranslateDto('Min') })
  @Max(5, { message: TranslateDto('Max') })
  rating!: number;

  @IsString({ message: TranslateDto('IsString') })
  content!: string;

  @IsUUID('4', { message: TranslateDto('IsUUID') })
  book_id!: string;

  @IsUUID('4', { message: TranslateDto('IsUUID') })
  user_id!: string;
}

export class UpdateReviewDto implements UpdateReview {
  @IsOptional()
  @IsNumber({}, { message: TranslateDto('IsNumber') })
  @Min(1, { message: TranslateDto('Min') })
  @Max(5, { message: TranslateDto('Max') })
  rating?: number;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  content?: string;
}

export class QueryReviewDto extends QueryDto<IQueryReviewKeys> {}
