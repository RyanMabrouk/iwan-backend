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
exports.CreateBookDto = void 0;
const class_validator_1 = require("class-validator");
const enums_types_1 = require("../../../../types/other/enums.types");
const TranslateDto_1 = require("../../../shared/utils/TranslateDto");
class CreateBookDto {
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: (0, TranslateDto_1.TranslateDto)('IsUUID') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "writer_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "share_house", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "editor", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1, {
        message: (0, TranslateDto_1.TranslateDto)('Max'),
    }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "release_year", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_types_1.BookStatusEnum, {
        message: (0, TranslateDto_1.TranslateDto)('IsEnum'),
    }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: (0, TranslateDto_1.TranslateDto)('IsUUID') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "cover_type_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.IsPositive)({ message: (0, TranslateDto_1.TranslateDto)('IsPositive') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.Min)(0, { message: (0, TranslateDto_1.TranslateDto)('Min') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "page_count", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: (0, TranslateDto_1.TranslateDto)('IsString') }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "isbn", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.IsPositive)({ message: (0, TranslateDto_1.TranslateDto)('IsPositive') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.IsPositive)({ message: (0, TranslateDto_1.TranslateDto)('IsPositive') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "price_usd", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    (0, class_validator_1.IsPositive)({ message: (0, TranslateDto_1.TranslateDto)('IsPositive') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_types_1.DiscountTypeEnum, {
        message: (0, TranslateDto_1.TranslateDto)('IsEnum'),
    }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "discount_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: (0, TranslateDto_1.TranslateDto)('IsNumber') }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "stock", void 0);
//# sourceMappingURL=create.dto.js.map