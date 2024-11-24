import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserRepository } from './infrastructure/repositories/repository';
import { UserFactory } from './factory/factory';
import { DatabaseModule } from '../../database/database.module';
import { UsersService } from './user.service';
import { WishlistModule } from './modules/wishlist/wishlist.module';

@Module({
  imports: [DatabaseModule, WishlistModule],
  controllers: [UsersController],
  providers: [UserFactory, UserRepository, UsersService],
  exports: [UserFactory, UserRepository, UsersService, WishlistModule],
})
export class UsersModule {}
