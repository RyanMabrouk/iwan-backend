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
exports.UpdateUserDto = void 0;
const enums_types_1 = require("../../../../types/other/enums.types");
const class_validator_1 = require("class-validator");
const TranslateDto_1 = require("../../../shared/utils/TranslateDto");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: (0, TranslateDto_1.TranslateDto)('IsArray') }),
    (0, class_validator_1.IsEnum)(enums_types_1.RolesEnum, {
        each: true,
        message: (0, TranslateDto_1.TranslateDto)('IsEnum'),
    }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "roles", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    (0, class_validator_1.IsNotEmpty)({ message: (0, TranslateDto_1.TranslateDto)('IsNotEmpty') }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    (0, class_validator_1.IsNotEmpty)({ message: (0, TranslateDto_1.TranslateDto)('IsNotEmpty') }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    (0, class_validator_1.IsNotEmpty)({ message: (0, TranslateDto_1.TranslateDto)('IsNotEmpty') }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "last_name", void 0);
//# sourceMappingURL=update.dto.js.map