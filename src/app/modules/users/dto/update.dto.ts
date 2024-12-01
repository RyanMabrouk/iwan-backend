import { RolesEnum } from 'src/types/other/enums.types';
import { UpdateUser } from './../infrastructure/entity/entity';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class UpdateUserDto implements UpdateUser {
  @IsOptional()
  @ValidateIf((o) => o.roles)
  @IsArray({ message: TranslateDto('IsArray') })
  @IsEnum(RolesEnum, {
    each: true,
    message: TranslateDto('IsEnum'),
  })
  roles?: RolesEnum[];

  @IsOptional()
  @ValidateIf((o) => o.avatar)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  avatar?: string;

  @IsOptional()
  @ValidateIf((o) => o.first_name)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  first_name?: string;

  @IsOptional()
  @ValidateIf((o) => o.last_name)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  last_name?: string;

  @IsOptional()
  @ValidateIf((o) => o.phone_number)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  phone_number?: string;

  @IsOptional()
  @ValidateIf((o) => o.address)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  city!: string;

  @IsOptional()
  @ValidateIf((o) => o.state)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  state!: string;

  @IsOptional()
  @ValidateIf((o) => o.postal_code)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  postal_code!: string;

  @IsOptional()
  @ValidateIf((o) => o.country)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  country!: string;

  @IsOptional()
  @ValidateIf((o) => o.street)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  street!: string;

  @IsOptional()
  @ValidateIf((o) => o.street2)
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  street2!: string;
}
