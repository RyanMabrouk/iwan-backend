import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserRepository } from './infrastructure/repositories/repository';
import { UserFactory } from './factory/factory';
import { DatabaseModule } from '../../database/database.module';
import { UsersService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserFactory, UserRepository, UsersService],
  exports: [UserFactory, UserRepository, UsersService],
})
export class UsersModule {}
