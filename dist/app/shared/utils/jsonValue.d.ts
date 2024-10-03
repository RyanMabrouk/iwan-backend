import { Expression, OperationNode } from 'kysely';
export declare class JsonValue<T> implements Expression<T> {
    private value;
    constructor(value: T);
    get expressionType(): T | undefined;
    toOperationNode(): OperationNode;
}
