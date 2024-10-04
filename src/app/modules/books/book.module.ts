import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';
import { BookRepository } from './infrastructure/repositories/repository';
import { BookFactory } from './factory/factory';
import { DatabaseModule } from '../../database/database.module';
import { BooksService } from './book.service';
import { CategoryModule } from './modules/category/category.module';
import { CoverTypeModule } from './modules/coverType/coverType.module';
import { WriterModule } from './modules/writer/writer.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';

@Module({
  imports: [
    DatabaseModule,
    CategoryModule,
    CoverTypeModule,
    WriterModule,
    SubcategoryModule,
  ],
  controllers: [BooksController],
  providers: [BookFactory, BookRepository, BooksService],
  exports: [
    BookFactory,
    BookRepository,
    BooksService,
    CategoryModule,
    CoverTypeModule,
    WriterModule,
    SubcategoryModule,
  ],
})
export class BooksModule {}
