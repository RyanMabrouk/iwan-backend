import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IDb } from 'src/app/database/types/IDb';
import { Kysely } from 'kysely';
import { DB_PROVIDER } from 'src/app/database/conf/constants';

@Injectable()
export class CronService {
  constructor(@Inject(DB_PROVIDER) private readonly db: Kysely<IDb>) {}

  @Cron(CronExpression.EVERY_MINUTE)
  healthCheck() {
    Logger.log('Health check', 'CronService');
  }
}
