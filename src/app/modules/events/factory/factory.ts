import { Injectable } from '@nestjs/common';
import { EntityFactory } from '../../../shared/types/EntityFactory';
import { Event } from '../domain/domain';
import { NewEvent } from '../infrastructure/entity/entity';

@Injectable()
export class EventFactory implements EntityFactory<NewEvent, Event> {
  createFromEntity(entity: NewEvent): Event {
    return new Event(entity);
  }
}
