import { IsNotEmpty, IsString } from 'class-validator';
import { NewCategory, UpdateCategory } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewCategoryDto implements NewCategory {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;
}

export class UpdateCategoryDto implements UpdateCategory {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;
}
