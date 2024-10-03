import { Scope } from '@nestjs/common';
import { ITransaction } from './types/transaction';
export declare const TransactionProviders: {
    provide: string;
    scope: Scope;
    inject: string[];
    useFactory: (request: Request, database: ITransaction) => Promise<ITransaction>;
}[];
