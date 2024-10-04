import { IsNotEmpty, IsString } from 'class-validator';
import { NewCoverType, UpdateCoverType } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewCoverTypeDto implements NewCoverType {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;
}

export class UpdateCoverTypeDto implements UpdateCoverType {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;
}
