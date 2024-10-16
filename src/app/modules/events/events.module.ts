import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { DatabaseModule } from '../../database/database.module';
import { EventFactory } from './factory/factory';
import { EventRepository } from './infrastructure/repositories/repository';
import { EventsService } from './events.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [EventFactory, EventRepository, EventsService],
  exports: [EventFactory, EventRepository, EventsService],
})
export class EventsModule {}
