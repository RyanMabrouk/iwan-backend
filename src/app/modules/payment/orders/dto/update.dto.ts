import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOrder } from './create.dto';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrder, ['payment_method']),
) {}
