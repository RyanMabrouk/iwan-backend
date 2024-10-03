"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_pino_1 = require("nestjs-pino");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("@nestjs/config");
const nestjs_i18n_1 = require("nestjs-i18n");
const express_1 = require("express");
const compression_1 = __importDefault(require("compression"));
const app_module_1 = require("./app.module");
const validationOptions_1 = require("./shared/utils/validationOptions");
const serializer_interceptor_1 = require("./shared/interceptors/serializer.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    const configService = app.get((config_1.ConfigService));
    app.use((0, compression_1.default)());
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.use((0, cookie_parser_1.default)());
    app.enableShutdownHooks();
    app.useGlobalPipes(new nestjs_i18n_1.I18nValidationPipe(validationOptions_1.validationOptions));
    app.useGlobalFilters(new nestjs_i18n_1.I18nValidationExceptionFilter({
        detailedErrors: false,
    }));
    app.useGlobalInterceptors(new serializer_interceptor_1.ResolvePromisesInterceptor(), new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)), new nestjs_pino_1.LoggerErrorInterceptor());
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const apiUrl = configService.getOrThrow('app.apiUrl', { infer: true });
    const apiPort = configService.getOrThrow('app.apiPort', { infer: true });
    await app.listen(apiPort);
    common_1.Logger.log(`🚀 Application is running on: ${apiUrl}/${globalPrefix}`);
}
bootstrap();
//# sourceMappingURL=main.js.map