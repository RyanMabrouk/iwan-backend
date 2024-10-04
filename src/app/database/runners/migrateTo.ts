import * as path from 'path';
import { promises as fs } from 'fs';
import {
  Migrator,
  FileMigrationProvider,
  NO_MIGRATIONS,
  NoMigrations,
} from 'kysely';
import { config } from 'dotenv';
import { database } from '../datasource';

config();

async function migrateTo(
  targetMigration: string | NoMigrations = NO_MIGRATIONS,
) {
  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), 'src/app/database/migrations'),
    }),
  });

  const { error, results } = await migrator.migrateTo(targetMigration);

  results?.forEach((migrationResult) => {
    if (migrationResult.status === 'Success') {
      if (migrationResult.direction === 'Up') {
        console.log(
          `Migration "${migrationResult.migrationName}" was applied successfully`,
        );
      } else if (migrationResult.direction === 'Down') {
        console.log(
          `Migration "${migrationResult.migrationName}" was reverted successfully`,
        );
      }
    } else if (migrationResult.status === 'Error') {
      console.error(
        `Failed to apply/revert migration "${migrationResult.migrationName}"`,
      );
    }
  });

  if (error) {
    console.error('Failed to apply/revert migrations');
    console.error(error);
    process.exit(1);
  }

  await database.destroy();
}

const targetMigration = process.argv[2];

console.log('targetMigration', targetMigration);

migrateTo(targetMigration);
