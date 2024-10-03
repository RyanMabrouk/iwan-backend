"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePostgresArrayFromObject = parsePostgresArrayFromObject;
function parsePostgresArrayFromObject(entity) {
    return Object.keys(entity).reduce((acc, key) => {
        if (typeof entity[key] === 'string' && entity[key].startsWith('{')) {
            acc[key] = entity[key]
                .replace(/^{/, '')
                .replace(/}$/, '')
                .split(',')
                .map((item) => item.replace(/"/g, ''));
        }
        else {
            acc[key] = entity[key];
        }
        return acc;
    }, {});
}
//# sourceMappingURL=parsePostgresArrayFromObject.js.map