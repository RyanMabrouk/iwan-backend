type returnType<TEntity> = {
    [K in keyof TEntity]: TEntity[K] | null;
};
type paramsType<TEntity> = {
    [K in keyof TEntity]: TEntity[K] | undefined | null;
};
export declare function replaceUndefinedWithNull<TEntity>(obj: paramsType<TEntity>): returnType<TEntity>;
export {};
