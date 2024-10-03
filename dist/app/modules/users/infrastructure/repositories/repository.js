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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../database/conf/constants");
const PostgresError_1 = require("../../../../shared/Errors/PostgresError");
const infinityPagination_1 = require("../../../../shared/utils/infinityPagination");
let UserRepository = class UserRepository {
    constructor(trx) {
        this.trx = trx;
    }
    async findOne({ user_id }) {
        try {
            const res = await this.trx
                .selectFrom('users')
                .where('user_id', '=', user_id)
                .selectAll()
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
                .selectFrom('users')
                .$if(!!query.filters, (q) => q.where((e) => e.and(Object.keys(query.filters ?? {}).flatMap((key) => (query.filters?.[key] ?? []).map((filter) => e(key, filter.operator, filter.value))))))
                .$if(!!query.search, (q) => q.where((e) => e.or(Object.keys(query.search ?? {}).flatMap((key) => (query.search?.[key] ?? []).map((filter) => e(key, filter.operator, filter.value))))));
            const [res, total] = await Promise.all([
                queryBuilder
                    .$if(!!query.sort, (q) => q.orderBy(query.sort.orderBy, query.sort?.order))
                    .$if(!!query.limit, (q) => q.limit(query.limit))
                    .$if(!!query.limit && !!query.page, (q) => q.offset((query.page - 1) * query.limit))
                    .selectAll()
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
                .updateTable('users')
                .set({
                ...args.payload,
                updated_at: new Date(),
            })
                .where('user_id', '=', args.user_id)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=repository.js.map