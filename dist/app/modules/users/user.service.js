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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("./infrastructure/repositories/repository");
const factory_1 = require("./factory/factory");
const errors_1 = require("../../../assets/constants/errors");
let UsersService = class UsersService {
    constructor(repository, factory) {
        this.repository = repository;
        this.factory = factory;
    }
    async findManyWithPagination(query) {
        return this.repository.findManyWithPagination(query);
    }
    async findOne({ id }) {
        const user = await this.repository.findOne({ user_id: id });
        if (user === null) {
            throw new common_1.NotFoundException((0, errors_1.ERRORS)('User not found'));
        }
        return user;
    }
    async updateOne({ id, payload, }) {
        const oldEntity = await this.findOne({ id });
        this.factory.createFromEntity({ ...oldEntity, ...payload });
        const updatedEntity = await this.repository.updateOne({
            user_id: id,
            payload,
        });
        if (!updatedEntity) {
            throw new common_1.InternalServerErrorException((0, errors_1.ERRORS)('Unexpected error!'));
        }
        return updatedEntity;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UserRepository,
        factory_1.UserFactory])
], UsersService);
//# sourceMappingURL=user.service.js.map