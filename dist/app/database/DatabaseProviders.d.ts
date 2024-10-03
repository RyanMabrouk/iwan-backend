import { Kysely } from 'kysely';
import { IDb } from './types/IDb';
import { ConfigService } from '@nestjs/config';
export declare const DatabaseProviders: {
    provide: string;
    inject: (typeof ConfigService)[];
    useFactory: (configService: ConfigService) => Promise<Kysely<IDb>>;
}[];
