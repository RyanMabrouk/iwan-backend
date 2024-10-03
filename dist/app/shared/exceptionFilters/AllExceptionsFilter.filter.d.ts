import { ExceptionFilter, ArgumentsHost, ValidationError } from '@nestjs/common';
import { Response } from 'express';
import { ITransaction } from '../../database/types/transaction';
import { I18nValidationException, I18nValidationExceptionFilterDetailedErrorsOption, I18nValidationExceptionFilterErrorFormatterOption, I18nValidationError } from 'nestjs-i18n';
import { IError, IValidationErrors } from 'src/types/other/error.type';
type I18nValidationExceptionFilterOptions = I18nValidationExceptionFilterDetailedErrorsOption | I18nValidationExceptionFilterErrorFormatterOption;
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly trx;
    private readonly options;
    constructor(trx: ITransaction, options?: I18nValidationExceptionFilterOptions);
    catch(exception: unknown, host: ArgumentsHost): Response<any, Record<string, any>>;
    private isWithErrorFormatter;
    protected normalizeValidationErrors(validationErrors: ValidationError[]): string[] | I18nValidationError[] | object;
    private flattenValidationErrors;
    protected buildResponseBody(host: ArgumentsHost, exc: I18nValidationException, errors: IValidationErrors): IError;
    private handlePostgresError;
}
export {};
