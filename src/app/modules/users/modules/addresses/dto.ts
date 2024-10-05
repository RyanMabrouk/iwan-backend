import { IsNotEmpty, IsString } from 'class-validator';
import { NewAddress, UpdateAddress } from './infrastructure/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';
import { PartialType } from '@nestjs/mapped-types';

export class NewAddressDto implements Omit<NewAddress, 'user_id'> {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  city!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  state!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  postal_code!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  country!: string;

  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  street!: string;
}

export class UpdateAddressDto
  extends PartialType(NewAddressDto)
  implements UpdateAddress {}
