"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSpaces = NoSpaces;
const class_validator_1 = require("class-validator");
function NoSpaces(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'noSpaces',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && !/\s/.test(value);
                },
                defaultMessage(args) {
                    return `${args.property} should not contain spaces`;
                },
            },
        });
    };
}
//# sourceMappingURL=NoSpaces.js.map