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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./infrastructure/repositories/repository");
const factory_1 = require("./factory/factory");
const errors_1 = require("../../../assets/constants/errors");
let BooksService = class BooksService {
    constructor(repository, factory) {
        this.repository = repository;
        this.factory = factory;
    }
    async findManyWithPagination(query) {
        return this.repository.findManyWithPagination(query);
    }
    async findOne({ id }) {
        const user = await this.repository.findOne({ id });
        if (user === null) {
            throw new common_1.NotFoundException((0, errors_1.ERRORS)('Book not found'));
        }
        return user;
    }
    async updateOne({ id, payload, }) {
        const oldEntity = await this.findOne({ id });
        this.factory.createFromEntity({ ...oldEntity, ...payload });
        const updatedEntity = await this.repository.updateOne({
            id,
            payload,
        });
        if (!updatedEntity) {
            throw new common_1.NotFoundException((0, errors_1.ERRORS)('Book not found'));
        }
        return updatedEntity;
    }
    async createOne({ payload, }) {
        this.factory.createFromEntity(payload);
        const createdEntity = await this.repository.createOne(payload);
        if (!createdEntity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return createdEntity;
    }
    async deleteOne({ id }) {
        const deletedEntity = await this.repository.deleteOne({ id });
        if (!deletedEntity) {
            throw new common_1.NotFoundException((0, errors_1.ERRORS)('Book not found'));
        }
        return deletedEntity;
    }
    async addCategoryToBook(payload) {
        const res = await this.repository.addCategoryToBook(payload);
        if (!res) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Failed to add category to book'));
        }
        return res;
    }
    async addSubcategoryToBook(payload) {
        const res = await this.repository.addSubcategoryToBook(payload);
        if (!res) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Failed to add subcategory to book'));
        }
        return res;
    }
    async removeCategoryFromBook({ book_id, category_id, }) {
        const res = await this.repository.removeCategoryFromBook({
            book_id,
            category_id,
        });
        if (!res) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Failed to remove category from book'));
        }
        return res;
    }
    async removeSubcategoryFromBook({ book_id, subcategory_id, }) {
        const res = await this.repository.removeSubcategoryFromBook({
            book_id,
            subcategory_id,
        });
        if (!res) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Failed to remove subcategory from book'));
        }
        return res;
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.BookRepository,
        factory_1.BookFactory])
], BooksService);
//# sourceMappingURL=book.service.js.map