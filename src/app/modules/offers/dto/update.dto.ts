import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create.dto';
import { UpdateOffer } from '../infrastructure/entity';

export class UpdateOfferDto
  extends PartialType(CreateOfferDto)
  implements UpdateOffer {}
