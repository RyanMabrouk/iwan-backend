import { AggregateRoot } from '@nestjs/cqrs';

export interface EntityFactory<
  TEntity extends Record<string, any>,
  TAggregate extends AggregateRoot,
> {
  createFromEntity(
    entity: TEntity,
    options?: Record<string, any>,
  ): TAggregate | Promise<TAggregate>;
  updateFromEntity?(
    oldEntity: TEntity,
    newEntity: TEntity,
    options?: Record<string, any>,
  ): TAggregate | Promise<TAggregate>;
}
