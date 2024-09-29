/* eslint-disable @typescript-eslint/no-empty-function */
import { Logger, Scope } from '@nestjs/common';
import { ITransaction } from './types/transaction';
import { beginTransaction } from './utils/beginTransaction';
import { REQUEST } from '@nestjs/core';
import { DB_PROVIDER, TRANSACTION_PROVIDER } from './conf/constants';

export const TransactionProviders = [
  {
    provide: TRANSACTION_PROVIDER,
    scope: Scope.REQUEST,
    inject: [REQUEST, DB_PROVIDER],
    useFactory: async (
      request: Request,
      database: ITransaction,
    ): Promise<ITransaction> => {
      if (request.method === 'GET') {
        database.commit = () => {};
        database.rollback = () => {};
        return database as ITransaction;
      } else {
        const trx = await beginTransaction(database);
        Logger.log('Transaction started');
        return trx;
      }
    },
  },
];
