import { IsNotEmpty, IsString } from 'class-validator';
import { NewCorner, UpdateCorner } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewCategoryDto implements NewCorner {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;
}

export class UpdateCategoryDto implements UpdateCorner {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;
}
