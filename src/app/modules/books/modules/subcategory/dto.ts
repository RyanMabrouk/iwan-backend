import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { NewSubcategory, UpdateSubcategory } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewSubcategoryDto implements NewSubcategory {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;

  @IsUUID(4, { message: TranslateDto('IsUUID') })
  category_id!: string;
}

export class UpdateSubcategoryDto implements UpdateSubcategory {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;
}
