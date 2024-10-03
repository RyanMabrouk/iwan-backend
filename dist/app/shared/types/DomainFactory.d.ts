import { AggregateRoot } from '@nestjs/cqrs';
export interface DomainFactory<TAggregate extends AggregateRoot> {
    create(...args: any): TAggregate | Promise<TAggregate>;
}
