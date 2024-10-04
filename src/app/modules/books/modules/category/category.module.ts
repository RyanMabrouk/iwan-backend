import { CategoryRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
