import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { OfferBookRepository } from './infrastructure/repository';

@Module({
  imports: [DatabaseModule],
  providers: [OfferBookRepository],
  exports: [OfferBookRepository],
})
export class OfferBookModule {}
