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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const update_dto_1 = require("./dto/update.dto");
const query_dto_1 = require("./dto/query.dto");
const book_service_1 = require("./book.service");
const constants_1 = require("../../database/conf/constants");
const create_dto_1 = require("./dto/create.dto");
let BooksController = class BooksController {
    constructor(service, trx) {
        this.service = service;
        this.trx = trx;
    }
    async getMany(query) {
        return this.service.findManyWithPagination(query);
    }
    async get(id) {
        return this.service.findOne({ id });
    }
    async patch(id, body) {
        const updateEntity = await this.service.updateOne({
            id,
            payload: body,
        });
        this.trx.commit();
        return updateEntity;
    }
    async post(body) {
        const createdEntity = await this.service.createOne({
            payload: body,
        });
        this.trx.commit();
        return createdEntity;
    }
    async delete(id) {
        const deletedEntity = await this.service.deleteOne({ id });
        this.trx.commit();
        return deletedEntity;
    }
    async addCategoryToBook(book_id, category_id) {
        return this.service.addCategoryToBook({ category_id, book_id });
    }
    async addSubcategoryToBook(book_id, subcategory_id) {
        return this.service.addSubcategoryToBook({ subcategory_id, book_id });
    }
    async removeCategoryFromBook(book_id, category_id) {
        return this.service.removeCategoryFromBook({ book_id, category_id });
    }
    async removeSubcategoryFromBook(book_id, subcategory_id) {
        return this.service.removeSubcategoryFromBook({
            book_id,
            subcategory_id,
        });
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.QueryBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getMany", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "patch", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "post", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':book_id/categories/:category_id'),
    __param(0, (0, common_1.Param)('book_id')),
    __param(1, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "addCategoryToBook", null);
__decorate([
    (0, common_1.Post)(':book_id/subcategories/:subcategory_id'),
    __param(0, (0, common_1.Param)('book_id')),
    __param(1, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "addSubcategoryToBook", null);
__decorate([
    (0, common_1.Delete)(':book_id/categories/:category_id'),
    __param(0, (0, common_1.Param)('book_id')),
    __param(1, (0, common_1.Param)('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "removeCategoryFromBook", null);
__decorate([
    (0, common_1.Delete)(':book_id/subcategories/:subcategory_id'),
    __param(0, (0, common_1.Param)('book_id')),
    __param(1, (0, common_1.Param)('subcategory_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "removeSubcategoryFromBook", null);
exports.BooksController = BooksController = __decorate([
    (0, common_1.Controller)({
        path: 'books',
    }),
    __param(1, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [book_service_1.BooksService, Object])
], BooksController);
//# sourceMappingURL=book.controller.js.map