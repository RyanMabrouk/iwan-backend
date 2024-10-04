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
exports.BookRepository = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../database/conf/constants");
const PostgresError_1 = require("../../../../shared/Errors/PostgresError");
const infinityPagination_1 = require("../../../../shared/utils/infinityPagination");
const postgres_1 = require("kysely/helpers/postgres");
let BookRepository = class BookRepository {
    constructor(trx) {
        this.trx = trx;
    }
    async findOne({ id }) {
        try {
            const res = await this.trx
                .selectFrom('books')
                .where('id', '=', id)
                .selectAll()
                .select((q) => [
                (0, postgres_1.jsonArrayFrom)(q
                    .selectFrom('book_categories')
                    .whereRef(`book_categories.book_id`, '=', `books.id`)
                    .innerJoin('categories', 'categories.id', 'book_categories.category_id')
                    .selectAll('categories')).as('categories'),
                (0, postgres_1.jsonArrayFrom)(q
                    .selectFrom('book_subcategories')
                    .whereRef(`book_subcategories.book_id`, '=', `books.id`)
                    .innerJoin('subcategories', 'subcategories.id', 'book_subcategories.subcategory_id')
                    .selectAll('subcategories')).as('subcategories'),
                (0, postgres_1.jsonObjectFrom)(q
                    .selectFrom('cover_types')
                    .whereRef(`cover_types.id`, '=', `books.cover_type_id`)
                    .selectAll()).as('cover_type'),
                (0, postgres_1.jsonObjectFrom)(q
                    .selectFrom('writers')
                    .whereRef(`writers.id`, '=', `books.writer_id`)
                    .selectAll()).as('writer'),
            ])
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async findManyWithPagination(query) {
        try {
            const queryBuilder = this.trx
                .selectFrom('books')
                .$if(!!query.filters, (q) => q.where((e) => e.and(Object.keys(query.filters ?? {}).flatMap((key) => (query.filters?.[key] ?? []).map((filter) => e(key, filter.operator, filter.value))))))
                .$if(!!query.search, (q) => q.where((e) => e.or(Object.keys(query.search ?? {}).flatMap((key) => (query.search?.[key] ?? []).map((filter) => e(key, filter.operator, filter.value))))));
            const [res, total] = await Promise.all([
                queryBuilder
                    .$if(!!query.sort, (q) => q.orderBy(query.sort.orderBy, query.sort?.order))
                    .$if(!!query.limit, (q) => q.limit(query.limit))
                    .$if(!!query.limit && !!query.page, (q) => q.offset((query.page - 1) * query.limit))
                    .selectAll()
                    .select((q) => [
                    (0, postgres_1.jsonArrayFrom)(q
                        .selectFrom('book_categories')
                        .whereRef(`book_categories.book_id`, '=', `books.id`)
                        .innerJoin('categories', 'categories.id', 'book_categories.category_id')
                        .selectAll('categories')).as('categories'),
                    (0, postgres_1.jsonArrayFrom)(q
                        .selectFrom('book_subcategories')
                        .whereRef(`book_subcategories.book_id`, '=', `books.id`)
                        .innerJoin('subcategories', 'subcategories.id', 'book_subcategories.subcategory_id')
                        .selectAll('subcategories')).as('subcategories'),
                    (0, postgres_1.jsonObjectFrom)(q
                        .selectFrom('cover_types')
                        .whereRef(`cover_types.id`, '=', `books.cover_type_id`)
                        .selectAll()).as('cover_type'),
                    (0, postgres_1.jsonObjectFrom)(q
                        .selectFrom('writers')
                        .whereRef(`writers.id`, '=', `books.writer_id`)
                        .selectAll()).as('writer'),
                ])
                    .execute(),
                queryBuilder
                    .select(this.trx.fn.countAll().as('count'))
                    .executeTakeFirst(),
            ]);
            return (0, infinityPagination_1.infinityPagination)(res, {
                total_count: Number(total?.count ?? 0),
                page: query.page,
                limit: query.limit,
            });
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async updateOne(args) {
        try {
            const res = await this.trx
                .updateTable('books')
                .set({
                ...args.payload,
                updated_at: new Date(),
            })
                .where('id', '=', args.id)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async deleteOne({ id }) {
        try {
            const res = await this.trx
                .deleteFrom('books')
                .where('id', '=', id)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async createOne(payload) {
        try {
            const res = await this.trx
                .insertInto('books')
                .values(payload)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async addCategoryToBook(payload) {
        try {
            const res = await this.trx
                .insertInto('book_categories')
                .values(payload)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async addSubcategoryToBook(payload) {
        try {
            const res = await this.trx
                .insertInto('book_subcategories')
                .values(payload)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async removeCategoryFromBook({ book_id, category_id, }) {
        try {
            const res = await this.trx
                .deleteFrom('book_categories')
                .where('book_id', '=', book_id)
                .where('category_id', '=', category_id)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async removeSubcategoryFromBook({ book_id, subcategory_id, }) {
        try {
            const res = await this.trx
                .deleteFrom('book_subcategories')
                .where('book_id', '=', book_id)
                .where('subcategory_id', '=', subcategory_id)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = __decorate([
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], BookRepository);
//# sourceMappingURL=repository.js.map