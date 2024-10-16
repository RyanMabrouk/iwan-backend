import { UpdateEvent } from '../infrastructure/entity/entity';
import { CreateEventDto } from './create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEventDto
  extends PartialType(CreateEventDto)
  implements UpdateEvent {}
