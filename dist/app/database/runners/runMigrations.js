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
const path = __importStar(require("path"));
const fs_1 = require("fs");
const kysely_1 = require("kysely");
const dotenv_1 = require("dotenv");
const datasource_1 = require("../datasource");
const common_1 = require("@nestjs/common");
(0, dotenv_1.config)();
async function migrateToLatest() {
    const migrator = new kysely_1.Migrator({
        db: datasource_1.database,
        provider: new kysely_1.FileMigrationProvider({
            fs: fs_1.promises,
            path,
            migrationFolder: path.join(process.cwd(), 'src/app/database/migrations'),
        }),
        allowUnorderedMigrations: true,
    });
    const { error, results } = await migrator.migrateToLatest();
    results?.forEach((migrationResult) => {
        if (migrationResult.status === 'Success') {
            common_1.Logger.log(`migration "${migrationResult.migrationName}" was executed successfully`);
        }
        else if (migrationResult.status === 'Error') {
            common_1.Logger.error(`failed to execute migration "${migrationResult.migrationName}"`);
        }
    });
    if (error) {
        common_1.Logger.error('Failed to migrate');
        common_1.Logger.error(error);
        process.exit(1);
    }
    await datasource_1.database.destroy();
}
migrateToLatest();
//# sourceMappingURL=runMigrations.js.map