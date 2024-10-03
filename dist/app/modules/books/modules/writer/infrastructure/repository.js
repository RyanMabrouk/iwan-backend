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
exports.WriterRepository = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../../database/conf/constants");
const PostgresError_1 = require("../../../../../shared/Errors/PostgresError");
let WriterRepository = class WriterRepository {
    constructor(trx) {
        this.trx = trx;
    }
    async findMany() {
        try {
            const res = await this.trx.selectFrom('writers').selectAll().execute();
            return res;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
    async updateOne(args) {
        try {
            const res = await this.trx
                .updateTable('writers')
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
                .deleteFrom('writers')
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
                .insertInto('writers')
                .values(payload)
                .returningAll()
                .executeTakeFirst();
            return res ?? null;
        }
        catch (err) {
            throw new PostgresError_1.PostgresError(err);
        }
    }
};
exports.WriterRepository = WriterRepository;
exports.WriterRepository = WriterRepository = __decorate([
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTION_PROVIDER)),
    __metadata("design:paramtypes", [Object])
], WriterRepository);
//# sourceMappingURL=repository.js.map