type returnType<TEntity> = {
  [K in keyof TEntity]: TEntity[K] | null;
};
type paramsType<TEntity> = {
  [K in keyof TEntity]: TEntity[K] | undefined | null;
};

export function replaceUndefinedWithNull<TEntity>(
  obj: paramsType<TEntity>,
): returnType<TEntity> {
  for (const key in obj) {
    if (obj[key] === undefined) {
      obj[key] = null;
    }
  }
  return obj as returnType<TEntity>;
}
