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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const class_transformer_1 = require("class-transformer");
const validateConfig_1 = require("../shared/utils/validateConfig");
class EnvironmentVariablesValidator {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "APP_FALLBACK_LANGUAGE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "APP_HEADER_LANGUAGE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "FRONTEND_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "API_URL", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", String)
], EnvironmentVariablesValidator.prototype, "API_PORT", void 0);
exports.default = (0, config_1.registerAs)('app', () => {
    (0, validateConfig_1.validateConfig)(process.env, EnvironmentVariablesValidator);
    return {
        fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE,
        headerLanguage: process.env.APP_HEADER_LANGUAGE,
        frontendUrl: process.env.FRONTEND_URL,
        apiUrl: process.env.API_URL,
        apiPort: parseInt(process.env.API_PORT, 10),
        dbUrl: process.env.DATABASE_URL,
        databasePoolMax: 500,
    };
});
//# sourceMappingURL=app.conf.js.map