"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class User extends cqrs_1.AggregateRoot {
    constructor(entity) {
        super();
        this.data = entity;
    }
}
exports.User = User;
//# sourceMappingURL=domain.js.map