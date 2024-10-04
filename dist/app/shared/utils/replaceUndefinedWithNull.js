"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceUndefinedWithNull = replaceUndefinedWithNull;
function replaceUndefinedWithNull(obj) {
    for (const key in obj) {
        if (obj[key] === undefined) {
            obj[key] = null;
        }
    }
    return obj;
}
//# sourceMappingURL=replaceUndefinedWithNull.js.map