import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { NewWriter, UpdateWriter } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';
import { nationalities } from './constants/countries';

export class NewWriterDto implements NewWriter {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;

  @IsOptional()
  @ValidateIf((e) => e.nationality !== null)
  @IsString({ message: TranslateDto('IsString') })
  @IsIn(nationalities.map((e) => e.value), { message: TranslateDto('IsIn') })
  nationality?: string;
}

export class UpdateWriterDto implements UpdateWriter {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;

  @IsOptional()
  @ValidateIf((e) => e.nationality !== null)
  @IsString({ message: TranslateDto('IsString') })
  @IsIn(nationalities.map((e) => e.value), { message: TranslateDto('IsIn') })
  nationality?: string;
}
