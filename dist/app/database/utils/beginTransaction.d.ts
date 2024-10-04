import { Kysely } from 'kysely';
import { ITransaction } from '../types/transaction';
export declare function beginTransaction<T>(db: Kysely<T>): Promise<ITransaction>;
