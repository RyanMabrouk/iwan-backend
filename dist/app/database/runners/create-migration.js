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
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path = __importStar(require("path"));
function getTimestamp() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return (now.getFullYear().toString() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds()));
}
async function createMigrationFile(description) {
    const timestamp = getTimestamp();
    const filename = `${timestamp}_${description.trim().split(' ').join('_')}.ts`;
    const filePath = path.join(process.cwd(), 'src/app/database/migrations', filename);
    const content = `import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  // TODO: Implement migration logic
}

export async function down(db: Kysely<unknown>) {
  // TODO: Implement rollback logic
}
`;
    try {
        await fs_1.promises.writeFile(filePath, content, { flag: 'wx' });
    }
    catch (error) {
        if (error.code === 'EEXIST') {
            common_1.Logger.error(`Migration file already exists: ${filename}`);
        }
        else {
            common_1.Logger.error(`Error creating migration file: ${error instanceof Error ? error.message : error}`);
        }
    }
}
const description = process.argv[2];
if (!description) {
    common_1.Logger.error('Please provide a description for the migration');
    process.exit(1);
}
createMigrationFile(description).catch((error) => {
    common_1.Logger.error(`Failed to create migration file: ${error.message}`);
    process.exit(1);
});
//# sourceMappingURL=create-migration.js.map