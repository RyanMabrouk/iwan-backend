import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { COMPARISON_OPERATORS, ComparisonOperator } from 'kysely';

export class SearchDto {
  @IsIn(COMPARISON_OPERATORS)
  operator!: ComparisonOperator;

  @IsString()
  @IsNotEmpty()
  value!: string | string[] | null;
}
