import { IDb } from 'src/app/database/types/IDb';
import { Kysely } from 'kysely';
export declare class CronService {
    private readonly db;
    constructor(db: Kysely<IDb>);
    healthCheck(): void;
}
