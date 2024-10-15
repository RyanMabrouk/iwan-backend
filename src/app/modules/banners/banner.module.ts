import { BannerRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { BannersController } from './banner.controller';
import { BannersService } from './banner.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BannersController],
  providers: [BannerRepository, BannersService],
  exports: [BannerRepository, BannersService],
})
export class BannersModule {}
