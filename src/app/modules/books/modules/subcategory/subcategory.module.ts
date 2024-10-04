import { SubcategoryRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SubcategoryController],
  providers: [SubcategoryRepository, SubcategoryService],
  exports: [SubcategoryRepository, SubcategoryService],
})
export class SubcategoryModule {}
