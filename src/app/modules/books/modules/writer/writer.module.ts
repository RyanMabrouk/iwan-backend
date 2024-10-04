import { WriterRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WriterController],
  providers: [WriterRepository, WriterService],
  exports: [WriterRepository, WriterService],
})
export class WriterModule {}
