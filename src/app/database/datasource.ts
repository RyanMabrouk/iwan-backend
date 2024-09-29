import { Logger } from '@nestjs/common';
import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { Pool } from 'pg'; // PostgreSQL client library
import { IDb } from './types/IDb';
export const database = new Kysely<IDb>({
  plugins: [new ParseJSONResultsPlugin()],
  dialect: new PostgresDialect({
    onCreateConnection: async () => {
      Logger.log('db connected');
    },
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
  log(event) {
    const query = event.query;
    if (event.level === 'query') {
      Logger.log(
        `Executed query: ${query.sql} ${
          query.parameters.length > 0 ? `with params:[${query.parameters}]` : ''
        } in ${event.queryDurationMillis} ms`,
      );
    } else {
      Logger.error(
        `Executed query: ${query.sql} ${
          query.parameters.length > 0 ? `with params:[${query.parameters}]` : ''
        } in ${event.queryDurationMillis} ms`,
        event.error,
      );
    }
  },
});
