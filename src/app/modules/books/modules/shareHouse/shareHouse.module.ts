import { ShareHouseRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { ShareHouseController } from './shareHouse.controller';
import { ShareHouseService } from './shareHouse.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ShareHouseController],
  providers: [ShareHouseRepository, ShareHouseService],
  exports: [ShareHouseRepository, ShareHouseService],
})
export class ShareHouseModule {}
