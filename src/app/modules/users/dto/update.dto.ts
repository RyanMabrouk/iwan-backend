import { RolesEnum } from 'src/types/other/enums.types';
import { UpdateUser } from './../infrastructure/entity/entity';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class UpdateUserDto implements UpdateUser {
  @IsOptional()
  @IsArray({ message: TranslateDto('IsArray') })
  @IsEnum(RolesEnum, {
    each: true,
    message: TranslateDto('IsEnum'),
  })
  roles?: RolesEnum[];

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  avatar?: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  first_name?: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  last_name?: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  phone_number?: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  city!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  state!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  postal_code!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  country!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  street!: string;

  @IsOptional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  street2!: string;
}
