"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModule = void 0;
const common_1 = require("@nestjs/common");
const book_controller_1 = require("./book.controller");
const repository_1 = require("./infrastructure/repositories/repository");
const factory_1 = require("./factory/factory");
const database_module_1 = require("../../database/database.module");
const book_service_1 = require("./book.service");
const category_module_1 = require("./modules/category/category.module");
const coverType_module_1 = require("./modules/coverType/coverType.module");
const writer_module_1 = require("./modules/writer/writer.module");
const subcategory_module_1 = require("./modules/subcategory/subcategory.module");
let BooksModule = class BooksModule {
};
exports.BooksModule = BooksModule;
exports.BooksModule = BooksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            category_module_1.CategoryModule,
            coverType_module_1.CoverTypeModule,
            writer_module_1.WriterModule,
            subcategory_module_1.SubcategoryModule,
        ],
        controllers: [book_controller_1.BooksController],
        providers: [factory_1.BookFactory, repository_1.BookRepository, book_service_1.BooksService],
        exports: [
            factory_1.BookFactory,
            repository_1.BookRepository,
            book_service_1.BooksService,
            category_module_1.CategoryModule,
            coverType_module_1.CoverTypeModule,
            writer_module_1.WriterModule,
            subcategory_module_1.SubcategoryModule,
        ],
    })
], BooksModule);
//# sourceMappingURL=book.module.js.map