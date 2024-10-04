export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  props: K[],
): Omit<T, K> {
  const result: Partial<T> = {};
  (Object.keys(obj) as K[]).forEach((key) => {
    if (!props.includes(key)) {
      result[key] = obj[key];
    }
  });
  return result as Omit<T, K>;
}
