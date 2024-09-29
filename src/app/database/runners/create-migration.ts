import { Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

async function createMigrationFile(description: string): Promise<void> {
  const timestamp = getTimestamp();
  const filename = `${timestamp}_${description.trim().split(' ').join('_')}.ts`;
  const filePath = path.join(
    process.cwd(),
    'src/app/database/migrations',
    filename,
  );
  const content = `import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
  // TODO: Implement migration logic
}

export async function down(db: Kysely<unknown>) {
  // TODO: Implement rollback logic
}
`;

  try {
    await fs.writeFile(filePath, content, { flag: 'wx' });
  } catch (error) {
    if ((error as { code: string }).code === 'EEXIST') {
      Logger.error(`Migration file already exists: ${filename}`);
    } else {
      Logger.error(
        `Error creating migration file: ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}

const description = process.argv[2];
if (!description) {
  Logger.error('Please provide a description for the migration');
  process.exit(1);
}

createMigrationFile(description).catch((error) => {
  Logger.error(`Failed to create migration file: ${error.message}`);
  process.exit(1);
});
