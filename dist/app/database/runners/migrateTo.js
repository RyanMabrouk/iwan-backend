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
(0, dotenv_1.config)();
async function migrateTo(targetMigration = kysely_1.NO_MIGRATIONS) {
    const migrator = new kysely_1.Migrator({
        db: datasource_1.database,
        provider: new kysely_1.FileMigrationProvider({
            fs: fs_1.promises,
            path,
            migrationFolder: path.join(process.cwd(), 'src/app/database/migrations'),
        }),
    });
    const { error, results } = await migrator.migrateTo(targetMigration);
    results?.forEach((migrationResult) => {
        if (migrationResult.status === 'Success') {
            if (migrationResult.direction === 'Up') {
                console.log(`Migration "${migrationResult.migrationName}" was applied successfully`);
            }
            else if (migrationResult.direction === 'Down') {
                console.log(`Migration "${migrationResult.migrationName}" was reverted successfully`);
            }
        }
        else if (migrationResult.status === 'Error') {
            console.error(`Failed to apply/revert migration "${migrationResult.migrationName}"`);
        }
    });
    if (error) {
        console.error('Failed to apply/revert migrations');
        console.error(error);
        process.exit(1);
    }
    await datasource_1.database.destroy();
}
const targetMigration = process.argv[2];
console.log('targetMigration', targetMigration);
migrateTo(targetMigration);
//# sourceMappingURL=migrateTo.js.map