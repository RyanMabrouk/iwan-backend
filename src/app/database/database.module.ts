import { Module } from '@nestjs/common';
import { TransactionProviders } from './transaction.provider';
import { DatabaseProviders } from './DatabaseProviders';

@Module({
  providers: [...TransactionProviders, ...DatabaseProviders],
  exports: [...TransactionProviders, ...DatabaseProviders],
})
export class DatabaseModule {}
