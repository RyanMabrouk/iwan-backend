import { Strategy } from 'passport-jwt';
import { AuthUser } from '@supabase/supabase-js';
declare const SupabaseStrategy_base: new (...args: any[]) => Strategy;
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    constructor();
    validate(user: AuthUser): Promise<AuthUser>;
}
export {};
