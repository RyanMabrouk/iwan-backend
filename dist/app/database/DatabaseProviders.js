"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProviders = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const pg = __importStar(require("pg"));
const constants_1 = require("./conf/constants");
const config_1 = require("@nestjs/config");
exports.DatabaseProviders = [
    {
        provide: constants_1.DB_PROVIDER,
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const appConf = configService.getOrThrow('app');
            async function countConnections() {
                const client = await pool.connect();
                try {
                    const res = await client.query('SELECT count(*) FROM pg_stat_activity;');
                    common_1.Logger.log(`🚀 ~ Active DB connections: ${res.rows[0].count}`);
                }
                finally {
                    client.release();
                }
            }
            const numeric = 1700;
            pg.types.setTypeParser(numeric, (val) => {
                return parseInt(val, 10);
            });
            const pool = new pg.Pool({
                connectionString: appConf.dbUrl,
                max: appConf.databasePoolMax,
            });
            pool.on('connect', (client) => {
                client.query('SET search_path TO public');
            });
            countConnections().catch((err) => common_1.Logger.error('Error counting connections', err.stack));
            const database = new kysely_1.Kysely({
                plugins: [new kysely_1.ParseJSONResultsPlugin()],
                dialect: new kysely_1.PostgresDialect({
                    onCreateConnection: async () => {
                        common_1.Logger.log('🚀 ~ db connected');
                        countConnections().catch((err) => common_1.Logger.error('Error counting connections', err.stack));
                    },
                    pool,
                }),
                log(event) {
                    const query = event.query;
                    if (event.level === 'query') {
                        common_1.Logger.log(`Executed query: ${query.sql} ${query.parameters.length > 0
                            ? `with params:[${query.parameters}]`
                            : ''} in ${event.queryDurationMillis} ms`);
                    }
                    else {
                        common_1.Logger.error(`Executed query: ${query.sql} ${query.parameters.length > 0
                            ? `with params:[${query.parameters}]`
                            : ''} in ${event.queryDurationMillis} ms`, event.error);
                    }
                },
            });
            return database;
        },
    },
];
//# sourceMappingURL=DatabaseProviders.js.map