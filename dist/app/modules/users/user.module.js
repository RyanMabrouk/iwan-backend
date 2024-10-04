"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const repository_1 = require("./infrastructure/repositories/repository");
const factory_1 = require("./factory/factory");
const database_module_1 = require("../../database/database.module");
const user_service_1 = require("./user.service");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [user_controller_1.UsersController],
        providers: [factory_1.UserFactory, repository_1.UserRepository, user_service_1.UsersService],
        exports: [factory_1.UserFactory, repository_1.UserRepository, user_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=user.module.js.map