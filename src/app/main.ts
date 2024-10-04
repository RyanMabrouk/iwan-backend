import { LoggerErrorInterceptor, Logger as PinoLogger } from 'nestjs-pino';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { json as expressJson, urlencoded as expressUrlEncoded } from 'express';
import compression from 'compression';
import { AppModule } from './app.module';
import { AllConfigType } from './conf/types/config.type';
import { validationOptions } from './shared/utils/validationOptions';
import { ResolvePromisesInterceptor } from './shared/interceptors/serializer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService<AllConfigType>);

  app.use(compression());

  app.use(expressJson({ limit: '50mb' }));
  app.use(expressUrlEncoded({ limit: '50mb', extended: true }));

  app.useLogger(app.get(PinoLogger));

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.enableShutdownHooks();

  app.useGlobalPipes(new I18nValidationPipe(validationOptions));

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    new ResolvePromisesInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggerErrorInterceptor(),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const apiUrl = configService.getOrThrow('app.apiUrl', { infer: true });
  const apiPort = configService.getOrThrow('app.apiPort', { infer: true });
  await app.listen(apiPort);
  Logger.log(`🚀 Application is running on: ${apiUrl}/${globalPrefix}`);
}
bootstrap();
