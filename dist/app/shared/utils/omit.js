"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = omit;
function omit(obj, props) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (!props.includes(key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
//# sourceMappingURL=omit.js.map