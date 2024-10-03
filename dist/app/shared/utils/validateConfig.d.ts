import { ClassConstructor } from 'class-transformer/types/interfaces';
export declare function validateConfig<T extends object>(config: object, envVariablesClass: ClassConstructor<T>): T;
