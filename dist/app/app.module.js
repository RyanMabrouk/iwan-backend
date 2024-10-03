"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const nestjs_i18n_1 = require("nestjs-i18n");
const throttler_1 = require("@nestjs/throttler");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const logger_module_1 = require("./shared/logger/logger.module");
const database_module_1 = require("./database/database.module");
const core_1 = require("@nestjs/core");
const app_conf_1 = __importDefault(require("./conf/app.conf"));
const path_1 = require("path");
const cron_module_1 = require("./shared/cron/cron.module");
const AllExceptionsFilter_filter_1 = require("./shared/exceptionFilters/AllExceptionsFilter.filter");
const RequestIdMiddleware_1 = require("./shared/middleware/RequestIdMiddleware");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./modules/users/user.module");
const book_module_1 = require("./modules/books/book.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(RequestIdMiddleware_1.RequestIdMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [
                    {
                        ttl: 20 * 1000,
                        limit: 60,
                    },
                ],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_conf_1.default],
                envFilePath: ['.env'],
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
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
                        path: (0, path_1.join)(process.cwd(), 'src/assets/i18n'),
                        watch: true,
                    },
                    typesOutputPath: (0, path_1.join)(process.cwd(), 'src/generated/i18n.generated.ts'),
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.AcceptLanguageResolver,
                        useFactory: (configService) => {
                            return [
                                configService.get('app.headerLanguage', {
                                    infer: true,
                                }),
                            ];
                        },
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            cron_module_1.CronModule,
            database_module_1.DatabaseModule,
            logger_module_1.LoggerModule,
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            book_module_1.BooksModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            {
                provide: core_1.APP_FILTER,
                useClass: AllExceptionsFilter_filter_1.AllExceptionsFilter,
                scope: common_1.Scope.REQUEST,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map