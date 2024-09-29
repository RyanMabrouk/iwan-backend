import { UpdateResult, Insertable, Selectable } from 'kysely';
import { InfinityPaginationResultType } from 'src/types/other/InfinityPaginationResultType';

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
  findOne(
    args: FindOneArgs<Selectable<TEntity>>,
  ): Promise<Selectable<TEntity> | null>;
  findManyWithPagination(
    query: QueryDto,
    ...args: unknown[]
  ): Promise<InfinityPaginationResultType<Selectable<TEntity>>>;
  createOne(
    payload: Insertable<TEntity>,
  ): Promise<Selectable<Selectable<TEntity> | null> | null>;
  updateOne(
    args: UpdateArgs<Selectable<TEntity>, UpdateDto>,
  ): Promise<UpdateResult | Selectable<TEntity> | null>;
  deleteOne(args: FindOneArgs<Selectable<TEntity>>): Promise<UpdateResult>;
}
