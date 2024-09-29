import { Kysely } from 'kysely';
import { ITransaction } from '../types/transaction';

export async function beginTransaction<T>(
  db: Kysely<T>,
): Promise<ITransaction> {
  return new Promise((res, rej) => {
    db.transaction()
      .execute(
        (trx) =>
          new Promise((commit, rollback) => {
            res(
              Object.assign(trx, {
                commit,
                rollback,
              }) as unknown as ITransaction,
            );
          }),
      )
      .catch(rej);
  });
}
