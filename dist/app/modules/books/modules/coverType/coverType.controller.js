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
exports.CoverTypeController = void 0;
const common_1 = require("@nestjs/common");
const coverType_service_1 = require("./coverType.service");
const dto_1 = require("./dto");
const constants_1 = require("../../../../database/conf/constants");
let CoverTypeController = class CoverTypeController {
    constructor(CoverTypeService, trx) {
        this.CoverTypeService = CoverTypeService;
        this.trx = trx;
    }
    async findMany() {
        return this.CoverTypeService.findMany();
    }
    async createOne(payload) {
        const res = await this.CoverTypeService.createOne(payload);
        this.trx.commit();
        return res;
    }
    async updateOne(id, payload) {
        const res = await this.CoverTypeService.updateOne(id, payload);
        this.trx.commit();
        return res;
    }
    async deleteOne(id) {
        const res = this.CoverTypeService.deleteOne(id);
        this.trx.commit();
        return res;
    }
};
exports.CoverTypeController = CoverTypeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoverTypeController.prototype, "findMany", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.NewCoverTypeDto]),
    __metadata("design:returntype", Promise)
], CoverTypeController.prototype, "createOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateCoverTypeDto]),
    __metadata("design:returntype", Promise)
], CoverTypeController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoverTypeController.prototype, "deleteOne", null);
exports.CoverTypeController = CoverTypeController = __decorate([
    (0, common_1.Controller)('cover_types'),
    __param(1, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [coverType_service_1.CoverTypeService, Object])
], CoverTypeController);
//# sourceMappingURL=coverType.controller.js.map