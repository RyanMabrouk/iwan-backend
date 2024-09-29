import * as path from 'path';
import { promises as fs } from 'fs';
import { Migrator, FileMigrationProvider } from 'kysely';
import { config } from 'dotenv';
import { database } from '../datasource';

config();

async function listAppliedMigrations() {
  const migrator = new Migrator({
    db: database,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(process.cwd(), 'src/app/database/migrations'),
    }),
  });

  const results = await migrator.getMigrations();

  return results.map((migration) => migration.name); // Extracting only the names of the migrations
}

async function displayAppliedMigrations() {
  try {
    const appliedMigrations = await listAppliedMigrations();
    console.log('Applied migrations:');
    appliedMigrations.forEach((migrationName) =>
      console.log('-', migrationName),
    );
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await database.destroy();
  }
}

displayAppliedMigrations();
