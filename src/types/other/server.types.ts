export type Insertable<T, O extends keyof T = never> = {
  [P in keyof Omit<
    T,
    'id' | 'created_at' | 'updated_at' | 'deleted_at' | O
  > as null extends T[P] ? P : never]?: T[P];
} & Omit<
  Omit<T, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | O>,
  keyof {
    [P in keyof Omit<
      T,
      'id' | 'created_at' | 'updated_at' | 'deleted_at' | O
    > as null extends T[P] ? P : never]: any;
  }
>;
export type Updateable<T, O extends keyof T = never> = Partial<
  Omit<T, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | O>
>;

export type JsonColumn = Record<string, string | Record<string, string>>;
