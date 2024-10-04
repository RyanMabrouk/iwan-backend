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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const update_dto_1 = require("./dto/update.dto");
const query_dto_1 = require("./dto/query.dto");
const user_service_1 = require("./user.service");
const AuthUser_1 = require("../../auth/AuthUser");
const constants_1 = require("../../database/conf/constants");
let UsersController = class UsersController {
    constructor(service, trx) {
        this.service = service;
        this.trx = trx;
    }
    async getMany(query) {
        return this.service.findManyWithPagination(query);
    }
    async getMe(userJwt) {
        return await this.service.findOne({
            id: userJwt.sub,
        });
    }
    async get(id) {
        return this.service.findOne({ id });
    }
    async patchMe(userJwt, body) {
        const updateEntity = await this.service.updateOne({
            id: userJwt.sub,
            payload: body,
        });
        this.trx.commit();
        return updateEntity;
    }
    async patch(id, body) {
        const updateEntity = await this.service.updateOne({
            id,
            payload: body,
        });
        this.trx.commit();
        return updateEntity;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMany", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, AuthUser_1.AuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, AuthUser_1.AuthenticatedUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patchMe", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patch", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)({
        path: 'users',
    }),
    __param(1, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [user_service_1.UsersService, Object])
], UsersController);
//# sourceMappingURL=user.controller.js.map