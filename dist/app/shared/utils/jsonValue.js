"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonValue = void 0;
const kysely_1 = require("kysely");
class JsonValue {
    constructor(value) {
        this.value = value;
    }
    get expressionType() {
        return undefined;
    }
    toOperationNode() {
        const json = JSON.stringify(this.value);
        return (0, kysely_1.sql) `CAST(${json} AS JSONB)`.toOperationNode();
    }
}
exports.JsonValue = JsonValue;
//# sourceMappingURL=jsonValue.js.map