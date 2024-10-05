import { AddressRepository } from './infrastructure/repository';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { AddressController } from './addresses.controller';
import { AddressService } from './addresses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [AddressRepository, AddressService],
  exports: [AddressRepository, AddressService],
})
export class AddressModule {}
