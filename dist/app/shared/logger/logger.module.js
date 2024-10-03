"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const nestjs_pino_1 = require("nestjs-pino");
const common_1 = require("@nestjs/common");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRootAsync({
                useFactory: () => {
                    common_1.Logger.debug('Logger initialized');
                    return {
                        pinoHttp: {
                            serializers: {
                                req: (req) => {
                                    const { headers, body, ...rest } = req;
                                    return rest;
                                },
                            },
                            customProps: () => ({
                                context: 'HTTP',
                            }),
                            transport: {
                                targets: [
                                    {
                                        target: 'pino-pretty',
                                        options: {
                                            destination: `./logs/output-${new Date().toDateString()}.log`,
                                            mkdir: true,
                                            colorize: false,
                                            singleLine: true,
                                        },
                                    },
                                    {
                                        target: 'pino-pretty',
                                        options: {
                                            destination: process.stdout.fd,
                                            singleLine: true,
                                        },
                                    },
                                ],
                            },
                        },
                    };
                },
            }),
        ],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map