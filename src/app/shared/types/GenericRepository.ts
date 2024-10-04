import { Insertable, Selectable } from 'kysely';
import { InfinityPaginationResultType } from 'src/app/shared/types/InfinityPaginationResultType';

type UpdateArgs<TEntity, UpdateDto> = {
  [K in keyof TEntity]: TEntity[K];
} & { payload: UpdateDto };
export type FindOneArgs<TEntity> = {
  [K in keyof TEntity]: TEntity[K];
};
export interface GenericRepository<
  TEntity extends Record<string, any>,
  UpdateDto = unknown,
  QueryDto = unknown,
> {
  findMany?(): Promise<Selectable<TEntity>[]>;
  findOne?(
    args: FindOneArgs<Selectable<TEntity>>,
  ): Promise<Selectable<TEntity> | null>;
  findManyWithPagination?(
    query: QueryDto,
    ...args: unknown[]
  ): Promise<InfinityPaginationResultType<Selectable<TEntity>>>;
  createOne?(payload: Insertable<TEntity>): Promise<Selectable<TEntity> | null>;
  updateOne?(
    args: UpdateArgs<Selectable<TEntity>, UpdateDto>,
  ): Promise<Selectable<TEntity> | null>;
  deleteOne?(
    args: FindOneArgs<Selectable<TEntity>>,
  ): Promise<Selectable<TEntity> | null>;
  createMany?(payload: Insertable<TEntity>[]): Promise<Selectable<TEntity>[]>;
  deleteMany?(
    args: FindOneArgs<Selectable<TEntity>>,
  ): Promise<Selectable<TEntity>[]>;
}
