"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class Book extends cqrs_1.AggregateRoot {
    constructor(entity) {
        super();
        this.data = entity;
    }
}
exports.Book = Book;
//# sourceMappingURL=domain.js.map