import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './shared/logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import appConfig from './conf/app.conf';
import { join } from 'path';
import { CronModule } from './shared/cron/cron.module';
import { AppConfig } from './conf/types/app-config.type';
import { AllExceptionsFilter } from './shared/exceptionFilters/AllExceptionsFilter.filter';
import { RequestIdMiddleware } from './shared/middleware/RequestIdMiddleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { BooksModule } from './modules/books/book.module';
import { OrdersModule } from './modules/payment/orders/orders.module';
import { BannersModule } from './modules/banners/banner.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 20 * 1000, // 20 seconds
          limit: 60,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      useFactory: (
        configService: ConfigService<{
          app: AppConfig;
        }>,
      ) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        fallbacks: {
          'en-CA': 'fr',
          'en-*': 'en',
          'fr-*': 'fr',
          'ar-*': 'ar',
          '*': 'en',
        },
        loaderOptions: {
          path: join(process.cwd(), 'src/assets/i18n'),
          watch: true,
        },
        typesOutputPath: join(process.cwd(), 'src/generated/i18n.generated.ts'),
      }),
      resolvers: [
        {
          use: AcceptLanguageResolver,
          useFactory: (
            configService: ConfigService<{
              app: { fallbackLanguage: string; headerLanguage: string };
            }>,
          ) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    CronModule,
    DatabaseModule,
    LoggerModule,
    AuthModule,
    UsersModule,
    BooksModule,
    OrdersModule,
    BannersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
