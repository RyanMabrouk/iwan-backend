"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateDto = TranslateDto;
const nestjs_i18n_1 = require("nestjs-i18n");
function TranslateDto(decorator_name) {
    return (0, nestjs_i18n_1.i18nValidationMessage)(`validation.${decorator_name}`);
}
//# sourceMappingURL=TranslateDto.js.map