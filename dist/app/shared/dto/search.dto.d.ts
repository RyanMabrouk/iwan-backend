import { ComparisonOperator } from 'kysely';
export declare class SearchDto {
    operator: ComparisonOperator;
    value: string | string[] | null;
}
