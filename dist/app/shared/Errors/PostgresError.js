"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresError = exports.PostgresErrorCode = void 0;
exports.isDatabaseError = isDatabaseError;
var PostgresErrorCode;
(function (PostgresErrorCode) {
    PostgresErrorCode["UniqueViolation"] = "23505";
    PostgresErrorCode["ForeignKeyViolation"] = "23503";
    PostgresErrorCode["NotNullViolation"] = "23502";
    PostgresErrorCode["CheckViolation"] = "23514";
})(PostgresErrorCode || (exports.PostgresErrorCode = PostgresErrorCode = {}));
function isDatabaseError(exception) {
    return exception instanceof Error && exception.name === 'PostgresError';
}
class PostgresError extends Error {
    constructor(error) {
        super(error.message);
        this.name = 'PostgresError';
        this.code = error.code || '';
        this.detail = error.detail || '';
        this.column = error.column || '';
        this.table = error.table || '';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PostgresError);
        }
    }
}
exports.PostgresError = PostgresError;
//# sourceMappingURL=PostgresError.js.map