import { ReviewRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewRepository, ReviewService],
})
export class ReviewModule {}
