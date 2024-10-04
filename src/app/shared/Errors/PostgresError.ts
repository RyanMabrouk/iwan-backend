export enum PostgresErrorCode {
  UniqueViolation = '23505',
  ForeignKeyViolation = '23503',
  NotNullViolation = '23502',
  CheckViolation = '23514',
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

export function isDatabaseError(
  exception: unknown,
): exception is DatabaseError {
  return exception instanceof Error && exception.name === 'PostgresError';
}

export class PostgresError extends Error {
  code: string;
  detail: string;
  column: string;
  table: string;
  constructor(error: any) {
    super(error.message); // Pass the message to the Error constructor
    this.name = 'PostgresError'; // Set the name of the error
    this.code = error.code || '';
    this.detail = error.detail || '';
    this.column = error.column || '';
    this.table = error.table || '';
    // This line maintains proper stack trace (only available in V8 environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PostgresError);
    }
  }
}
