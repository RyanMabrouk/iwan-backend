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
exports.WriterService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./infrastructure/repository");
const errors_1 = require("../../../../../assets/constants/errors");
let WriterService = class WriterService {
    constructor(WriterRepository) {
        this.WriterRepository = WriterRepository;
    }
    async findMany() {
        return await this.WriterRepository.findMany();
    }
    async createOne(payload) {
        const entity = await this.WriterRepository.createOne(payload);
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
    async updateOne(id, payload) {
        const entity = await this.WriterRepository.updateOne({ id, payload });
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
    async deleteOne(id) {
        const entity = await this.WriterRepository.deleteOne({ id });
        if (!entity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return entity;
    }
};
exports.WriterService = WriterService;
exports.WriterService = WriterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.WriterRepository])
], WriterService);
//# sourceMappingURL=writer.service.js.map