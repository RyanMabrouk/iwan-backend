import { ReviewRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { UsersModule } from 'src/app/modules/users/user.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ReviewController],
  providers: [ReviewRepository, ReviewService],
  exports: [ReviewRepository, ReviewService],
})
export class ReviewModule {}
