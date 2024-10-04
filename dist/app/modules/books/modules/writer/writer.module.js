"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterModule = void 0;
const repository_1 = require("./infrastructure/repository");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../../../database/database.module");
const writer_controller_1 = require("./writer.controller");
const writer_service_1 = require("./writer.service");
let WriterModule = class WriterModule {
};
exports.WriterModule = WriterModule;
exports.WriterModule = WriterModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [writer_controller_1.WriterController],
        providers: [repository_1.WriterRepository, writer_service_1.WriterService],
        exports: [repository_1.WriterRepository, writer_service_1.WriterService],
    })
], WriterModule);
//# sourceMappingURL=writer.module.js.map