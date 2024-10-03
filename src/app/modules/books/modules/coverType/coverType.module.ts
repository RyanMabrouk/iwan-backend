import { CoverTypeRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { CoverTypeController } from './coverType.controller';
import { CoverTypeService } from './coverType.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CoverTypeController],
  providers: [CoverTypeRepository, CoverTypeService],
  exports: [CoverTypeRepository, CoverTypeService],
})
export class CoverTypeModule {}
