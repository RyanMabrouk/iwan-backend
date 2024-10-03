export declare enum PostgresErrorCode {
    UniqueViolation = "23505",
    ForeignKeyViolation = "23503",
    NotNullViolation = "23502",
    CheckViolation = "23514"
}
export interface DatabaseError {
    message: string;
    stack: string;
    name: 'PostgresError';
    code: PostgresErrorCode;
    detail: string;
    column?: string;
    table: string;
}
export declare function isDatabaseError(exception: unknown): exception is DatabaseError;
export declare class PostgresError extends Error {
    code: string;
    detail: string;
    column: string;
    table: string;
    constructor(error: any);
}
