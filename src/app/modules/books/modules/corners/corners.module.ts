import { CornerRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { CornersController } from './corners.controller';
import { CornersService } from './corners.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CornersController],
  providers: [CornerRepository, CornersService],
  exports: [CornerRepository, CornersService],
})
export class CornersModule {}
