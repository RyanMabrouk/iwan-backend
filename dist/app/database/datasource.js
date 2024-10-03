"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const pg_1 = require("pg");
exports.database = new kysely_1.Kysely({
    plugins: [new kysely_1.ParseJSONResultsPlugin()],
    dialect: new kysely_1.PostgresDialect({
        onCreateConnection: async () => {
            common_1.Logger.log('db connected');
        },
        pool: new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
    log(event) {
        const query = event.query;
        if (event.level === 'query') {
            common_1.Logger.log(`Executed query: ${query.sql} ${query.parameters.length > 0 ? `with params:[${query.parameters}]` : ''} in ${event.queryDurationMillis} ms`);
        }
        else {
            common_1.Logger.error(`Executed query: ${query.sql} ${query.parameters.length > 0 ? `with params:[${query.parameters}]` : ''} in ${event.queryDurationMillis} ms`, event.error);
        }
    },
});
//# sourceMappingURL=datasource.js.map