import { WishlistRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WishlistController],
  providers: [WishlistRepository, WishlistService],
  exports: [WishlistRepository, WishlistService],
})
export class WishlistModule {}
