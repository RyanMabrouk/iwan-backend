import { IsNotEmpty, IsString } from 'class-validator';
import { NewShareHouse, UpdateShareHouse } from './infrastructure/entity';
import { Optional } from '@nestjs/common';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class NewShareHouseDto implements NewShareHouse {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name!: string;
}

export class UpdateShareHouseDto implements UpdateShareHouse {
  @Optional()
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({ message: TranslateDto('IsNotEmpty') })
  name?: string;
}
