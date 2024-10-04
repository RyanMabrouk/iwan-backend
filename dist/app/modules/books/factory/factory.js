"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookFactory = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../domain/domain");
let BookFactory = class BookFactory {
    createFromEntity(entity) {
        return new domain_1.Book(entity);
    }
};
exports.BookFactory = BookFactory;
exports.BookFactory = BookFactory = __decorate([
    (0, common_1.Injectable)()
], BookFactory);
//# sourceMappingURL=factory.js.map