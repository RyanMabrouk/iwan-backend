import { Logger } from '@nestjs/common';
import { Kysely, ParseJSONResultsPlugin, PostgresDialect } from 'kysely';
import { IDb } from './types/IDb';
import * as pg from 'pg';
import { DB_PROVIDER } from './conf/constants';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/app/conf/types/app-config.type';

export const DatabaseProviders = [
  {
    provide: DB_PROVIDER,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const appConf = configService.getOrThrow<AppConfig>('app');
      async function countConnections() {
        const client = await pool.connect();
        try {
          const res = await client.query(
            'SELECT count(*) FROM pg_stat_activity;',
          );
          Logger.log(`🚀 ~ Active DB connections: ${res.rows[0].count}`);
        } finally {
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
        // idleTimeoutMillis: 1, // Close idle clients after 1 ms
      });
      pool.on('connect', (client) => {
        client.query('SET search_path TO public');
      });
      countConnections().catch((err) =>
        Logger.error('Error counting connections', err.stack),
      );
      const database = new Kysely<IDb>({
        plugins: [new ParseJSONResultsPlugin()],
        dialect: new PostgresDialect({
          onCreateConnection: async () => {
            Logger.log('🚀 ~ db connected');
            countConnections().catch((err) =>
              Logger.error('Error counting connections', err.stack),
            );
          },
          pool,
        }),
        log(event) {
          const query = event.query;
          if (event.level === 'query') {
            Logger.log(
              `Executed query: ${query.sql} ${
                query.parameters.length > 0
                  ? `with params:[${query.parameters}]`
                  : ''
              } in ${event.queryDurationMillis} ms`,
            );
          } else {
            Logger.error(
              `Executed query: ${query.sql} ${
                query.parameters.length > 0
                  ? `with params:[${query.parameters}]`
                  : ''
              } in ${event.queryDurationMillis} ms`,
              event.error,
            );
          }
        },
      });
      return database;
    },
  },
];
