import { IDb } from './IDb';
import { Transaction } from 'kysely';
export interface ITransaction extends Transaction<IDb> {
  commit: () => void;
  rollback: () => void;
}
