import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  Inject,
  Optional,
  ValidationError,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ITransaction } from '../../database/types/transaction';
import {
  DatabaseError,
  PostgresErrorCode,
  isDatabaseError,
} from '../Errors/PostgresError';
import {
  I18nValidationException,
  I18nContext,
  I18nValidationExceptionFilterDetailedErrorsOption,
  I18nValidationExceptionFilterErrorFormatterOption,
  I18nValidationError,
} from 'nestjs-i18n';
import iterate from 'iterare';
import {
  formatI18nErrors,
  mapChildrenToValidationErrors,
} from 'nestjs-i18n/dist/utils';
import { extractNameFromErrorMessage } from '../utils/extractNameFromErrorMessage';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { IError, IValidationErrors } from 'src/types/other/error.type';
import { I18nTranslations } from 'src/generated/i18n.generated';

type I18nValidationExceptionFilterOptions =
  | I18nValidationExceptionFilterDetailedErrorsOption
  | I18nValidationExceptionFilterErrorFormatterOption;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
    @Optional()
    private readonly options: I18nValidationExceptionFilterOptions = {
      detailedErrors: false,
    },
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const i18n = I18nContext.current<I18nTranslations>(host);
      const lang = i18n?.lang;
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal Server Error';
      // log error and rollback transaction
      Logger.error(
        'Exception ' + exception?.toString(),
        exception instanceof Error ? exception.stack : '',
      );
      this.trx.rollback();
      const message =
        exception instanceof Error
          ? exception.message
          : exceptionResponse.toString();
      let error: IError = {
        type: exception instanceof Error ? exception.name : 'Error',
        message:
          i18n?.translate(
            `errors.${message as keyof I18nTranslations['errors']}`,
          ) ?? '',
        detail: '',
        timestamp: Date.now(),
      };
      if (isDatabaseError(exception)) {
        const { error: postgres_err, status: postgres_status } =
          this.handlePostgresError(exception, i18n);
        return response.status(postgres_status).send(postgres_err);
      }

      if (exception instanceof I18nValidationException) {
        const errors = formatI18nErrors(exception.errors, i18n?.service, {
          lang,
        });
        error = this.buildResponseBody(
          host,
          exception,
          this.normalizeValidationErrors(errors) as IValidationErrors,
        );
        return response.status(status).send(error);
      }
      return response.status(status).send(error);
    } catch (unknown_error) {
      const error: IError = {
        type: 'Unknown Error',
        message: 'An unknown error occurred',
        detail: unknown_error?.toString() ?? '',
        timestamp: Date.now(),
      };
      return response.status(HttpStatus.EXPECTATION_FAILED).send(error);
    }
  }

  private isWithErrorFormatter(
    options: I18nValidationExceptionFilterOptions,
  ): options is I18nValidationExceptionFilterErrorFormatterOption {
    return 'errorFormatter' in options;
  }
  protected normalizeValidationErrors(
    validationErrors: ValidationError[],
  ): string[] | I18nValidationError[] | object {
    if (
      this.isWithErrorFormatter(this.options) &&
      !('detailedErrors' in this.options)
    )
      return (
        this.options.errorFormatter?.(validationErrors) ?? validationErrors
      );
    if (
      !this.isWithErrorFormatter(this.options) &&
      !this.options.detailedErrors
    )
      return this.flattenValidationErrors(validationErrors);
    return validationErrors;
  }

  private flattenValidationErrors(
    validationErrors: ValidationError[],
  ): Record<string, string[]> {
    return iterate(validationErrors)
      .map((error) => mapChildrenToValidationErrors(error))
      .flatten()
      .filter((item) => !!item.constraints)
      .reduce((result: Record<string, string[]>, item) => {
        if (!result[item.property]) {
          result[item.property] = [];
        }
        result[item.property].push(...Object.values(item.constraints ?? {}));
        return result;
      }, {});
  }

  protected buildResponseBody(
    host: ArgumentsHost,
    exc: I18nValidationException,
    errors: IValidationErrors,
  ): IError {
    if ('responseBodyFormatter' in this.options) {
      return this.options.responseBodyFormatter?.(
        host,
        exc,
        errors,
      ) as unknown as IError;
    } else {
      return {
        message: exc.getResponse() as string,
        detail: 'Validation Error',
        type: 'Validation Error',
        errors,
        timestamp: Date.now(),
      };
    }
  }

  private handlePostgresError(
    exception: DatabaseError,
    i18n: I18nContext<I18nTranslations> | undefined,
  ): {
    error: IError;
    status: number;
  } {
    const { NotNullViolation, UniqueViolation, ForeignKeyViolation } =
      PostgresErrorCode;
    const lang = i18n?.lang;
    switch (exception.code) {
      case NotNullViolation: {
        const err = {
          message:
            i18n
              ?.translate(`errors.NotNullViolation`, {
                lang,
              })
              .replace('{property}', exception.column ?? '') ?? '',
          detail: exception.detail,
          type: 'PostgresError',
          timestamp: Date.now(),
        };
        return { error: err, status: HttpStatus.BAD_REQUEST };
      }
      case UniqueViolation: {
        const name = extractNameFromErrorMessage(exception.detail);
        const err = {
          message:
            i18n
              ?.translate(`errors.UniqueViolation`, {
                lang,
              })
              .replace('{property}', name ? ` with name ${name}` : '') ?? '',
          detail: exception.detail,
          type: 'PostgresError',
          timestamp: Date.now(),
        };
        return { error: err, status: HttpStatus.BAD_REQUEST };
      }
      case ForeignKeyViolation: {
        const regex = /Key \(([^)]+)\)=\(([^)]+)\)/;
        const matches = exception.detail.match(regex);
        const key = matches?.[1].slice(0, -3);
        const value = matches?.[2];
        const err = {
          message:
            i18n
              ?.translate(`errors.ForeignKeyViolation`, {
                lang,
              })
              .replace('{property}', key ?? '')
              .replace('{constraints.0}', value ?? '') ?? '',
          detail: exception.detail,
          type: 'PostgresError',
          timestamp: Date.now(),
        };
        return { error: err, status: HttpStatus.BAD_REQUEST };
      }
      default: {
        const err = {
          message:
            i18n?.translate(`errors.UnknownPostgresError`, {
              lang,
            }) ?? '',
          detail: exception.detail,
          type: 'PostgresError',
          timestamp: Date.now(),
        };
        return { error: err, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }
}
