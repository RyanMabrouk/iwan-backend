import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create.dto';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['payment_method', 'books']),
) {}
