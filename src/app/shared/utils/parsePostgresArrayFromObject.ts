export function parsePostgresArrayFromObject<T extends Record<string, any>>(
  entity: Record<string, any>,
): T {
  return Object.keys(entity).reduce(
    (acc: Record<string, string | string[]>, key) => {
      if (typeof entity[key] === 'string' && entity[key].startsWith('{')) {
        acc[key] = entity[key]
          .replace(/^{/, '')
          .replace(/}$/, '')
          .split(',')
          .map((item: string) => item.replace(/"/g, ''));
      } else {
        acc[key] = entity[key];
      }
      return acc;
    },
    {},
  ) as T;
}
