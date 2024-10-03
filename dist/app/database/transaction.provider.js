"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProviders = void 0;
const common_1 = require("@nestjs/common");
const beginTransaction_1 = require("./utils/beginTransaction");
const core_1 = require("@nestjs/core");
const constants_1 = require("./conf/constants");
exports.TransactionProviders = [
    {
        provide: constants_1.TRANSACTION_PROVIDER,
        scope: common_1.Scope.REQUEST,
        inject: [core_1.REQUEST, constants_1.DB_PROVIDER],
        useFactory: async (request, database) => {
            if (request.method === 'GET') {
                database.commit = () => { };
                database.rollback = () => { };
                return database;
            }
            else {
                const trx = await (0, beginTransaction_1.beginTransaction)(database);
                common_1.Logger.log('Transaction started');
                return trx;
            }
        },
    },
];
//# sourceMappingURL=transaction.provider.js.map