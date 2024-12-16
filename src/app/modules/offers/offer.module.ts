import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { OfferController } from './offer.controller';
import { OfferRepository } from './infrastructure/repository';
import { OfferService } from './offer.service';
import { OfferBookModule } from './modules/offerBooks/offerBook.module';

@Module({
  imports: [DatabaseModule, OfferBookModule],
  controllers: [OfferController],
  providers: [OfferRepository, OfferService],
  exports: [OfferRepository, OfferService],
})
export class OfferModule {}
