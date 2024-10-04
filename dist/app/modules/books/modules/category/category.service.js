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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./infrastructure/repository");
const errors_1 = require("../../../../../assets/constants/errors");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async findMany() {
        return await this.categoryRepository.findMany();
    }
    async createOne(payload) {
        const entity = await this.categoryRepository.createOne(payload);
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
    async updateOne(id, payload) {
        const entity = await this.categoryRepository.updateOne({ id, payload });
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
    async deleteOne(id) {
        const entity = await this.categoryRepository.deleteOne({ id });
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CategoryRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map