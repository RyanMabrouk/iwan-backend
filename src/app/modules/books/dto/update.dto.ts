import { UpdateBook } from '../infrastructure/entity/entity';
import { CreateBookDto } from './create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookDto
  extends PartialType(CreateBookDto)
  implements UpdateBook {}
