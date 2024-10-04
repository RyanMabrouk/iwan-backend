"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginTransaction = beginTransaction;
async function beginTransaction(db) {
    return new Promise((res, rej) => {
        db.transaction()
            .execute((trx) => new Promise((commit, rollback) => {
            res(Object.assign(trx, {
                commit,
                rollback,
            }));
        }))
            .catch(rej);
    });
}
//# sourceMappingURL=beginTransaction.js.map