"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const PostgresError_1 = require("../Errors/PostgresError");
const nestjs_i18n_1 = require("nestjs-i18n");
const iterare_1 = __importDefault(require("iterare"));
const utils_1 = require("nestjs-i18n/dist/utils");
const extractNameFromErrorMessage_1 = require("../utils/extractNameFromErrorMessage");
const constants_1 = require("../../database/conf/constants");
const errors_1 = require("../../../assets/constants/errors");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(trx, options = {
        detailedErrors: false,
    }) {
        this.trx = trx;
        this.options = options;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        try {
            const i18n = nestjs_i18n_1.I18nContext.current(host);
            if (!i18n) {
                throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
            }
            const lang = i18n?.lang;
            const status = exception instanceof common_1.HttpException
                ? exception.getStatus()
                : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const exceptionResponse = exception instanceof common_1.HttpException
                ? exception.getResponse()
                : 'Internal Server Error';
            common_1.Logger.error('Exception ' + exception?.toString(), exception instanceof Error ? exception.stack : '');
            this.trx.rollback();
            const message = exception instanceof Error
                ? exception.message
                : exceptionResponse.toString();
            let error = {
                type: exception instanceof Error ? exception.name : 'Error',
                message: i18n?.translate(`errors.${message}`) ?? '',
                detail: '',
                timestamp: Date.now(),
            };
            if ((0, PostgresError_1.isDatabaseError)(exception)) {
                const { error: postgres_err, status: postgres_status } = this.handlePostgresError(exception, i18n);
                return response.status(postgres_status).send(postgres_err);
            }
            if (exception instanceof nestjs_i18n_1.I18nValidationException) {
                const errors = (0, utils_1.formatI18nErrors)(exception.errors, i18n?.service, {
                    lang,
                });
                error = this.buildResponseBody(host, exception, this.normalizeValidationErrors(errors));
                return response.status(status).send(error);
            }
            return response.status(status).send(error);
        }
        catch (unknown_error) {
            const error = {
                type: 'Unknown Error',
                message: 'An unknown error occurred',
                detail: unknown_error?.toString() ?? '',
                timestamp: Date.now(),
            };
            return response.status(common_1.HttpStatus.EXPECTATION_FAILED).send(error);
        }
    }
    isWithErrorFormatter(options) {
        return 'errorFormatter' in options;
    }
    normalizeValidationErrors(validationErrors) {
        if (this.isWithErrorFormatter(this.options) &&
            !('detailedErrors' in this.options))
            return (this.options.errorFormatter?.(validationErrors) ?? validationErrors);
        if (!this.isWithErrorFormatter(this.options) &&
            !this.options.detailedErrors)
            return this.flattenValidationErrors(validationErrors);
        return validationErrors;
    }
    flattenValidationErrors(validationErrors) {
        return (0, iterare_1.default)(validationErrors)
            .map((error) => (0, utils_1.mapChildrenToValidationErrors)(error))
            .flatten()
            .filter((item) => !!item.constraints)
            .reduce((result, item) => {
            if (!result[item.property]) {
                result[item.property] = [];
            }
            result[item.property].push(...Object.values(item.constraints ?? {}));
            return result;
        }, {});
    }
    buildResponseBody(host, exc, errors) {
        if ('responseBodyFormatter' in this.options) {
            return this.options.responseBodyFormatter?.(host, exc, errors);
        }
        else {
            return {
                message: exc.getResponse(),
                detail: 'Validation Error',
                type: 'Validation Error',
                errors,
                timestamp: Date.now(),
            };
        }
    }
    handlePostgresError(exception, i18n) {
        const { NotNullViolation, UniqueViolation, ForeignKeyViolation } = PostgresError_1.PostgresErrorCode;
        const lang = i18n?.lang;
        switch (exception.code) {
            case NotNullViolation: {
                const err = {
                    message: i18n
                        ?.translate(`errors.NotNullViolation`, {
                        lang,
                    })
                        .replace('{property}', exception.column ?? '') ?? '',
                    detail: exception.detail,
                    type: 'PostgresError',
                    timestamp: Date.now(),
                };
                return { error: err, status: common_1.HttpStatus.BAD_REQUEST };
            }
            case UniqueViolation: {
                const name = (0, extractNameFromErrorMessage_1.extractNameFromErrorMessage)(exception.detail);
                const err = {
                    message: i18n
                        ?.translate(`errors.UniqueViolation`, {
                        lang,
                    })
                        .replace('{property}', name ? ` with name ${name}` : '') ?? '',
                    detail: exception.detail,
                    type: 'PostgresError',
                    timestamp: Date.now(),
                };
                return { error: err, status: common_1.HttpStatus.BAD_REQUEST };
            }
            case ForeignKeyViolation: {
                const regex = /Key \(([^)]+)\)=\(([^)]+)\)/;
                const matches = exception.detail.match(regex);
                const key = matches?.[1].slice(0, -3);
                const value = matches?.[2];
                const err = {
                    message: i18n
                        ?.translate(`errors.ForeignKeyViolation`, {
                        lang,
                    })
                        .replace('{property}', key ?? '')
                        .replace('{constraints.0}', value ?? '') ?? '',
                    detail: exception.detail,
                    type: 'PostgresError',
                    timestamp: Date.now(),
                };
                return { error: err, status: common_1.HttpStatus.BAD_REQUEST };
            }
            default: {
                const err = {
                    message: i18n?.translate(`errors.UnknownPostgresError`, {
                        lang,
                    }) ?? '',
                    detail: exception.detail,
                    type: 'PostgresError',
                    timestamp: Date.now(),
                };
                return { error: err, status: common_1.HttpStatus.INTERNAL_SERVER_ERROR };
            }
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __param(1, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object, Object])
], AllExceptionsFilter);
//# sourceMappingURL=AllExceptionsFilter.filter.js.map