import { IsString, IsNotEmpty, IsArray, IsUUID } from 'class-validator';
import { NewEvent } from '../infrastructure/entity/entity';
import { TranslateDto } from 'src/app/shared/utils/TranslateDto';

export class CreateEventDto implements NewEvent {
  @IsString({ message: TranslateDto('IsString') })
  @IsNotEmpty({
    message: TranslateDto('IsNotEmpty'),
  })
  name!: string;

  @IsArray({ message: TranslateDto('IsArray') })
  @IsUUID(4, { each: true, message: TranslateDto('IsUUID') })
  books_ids!: string[];
}
