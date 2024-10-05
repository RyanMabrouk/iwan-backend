import {
  Controller,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { AddressService } from './addresses.service';
import { NewAddressDto, UpdateAddressDto } from './dto';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { AddressEntity } from './infrastructure/entity';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';
import { AuthenticatedUser } from 'src/app/auth/AuthUser';

@Controller('addresses')
export class AddressController {
  constructor(
    private readonly AddressService: AddressService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @Post()
  async createOne(
    @Body() payload: NewAddressDto,
    @AuthenticatedUser() userJwt: ITokenPayload,
  ): Promise<AddressEntity> {
    const res = await this.AddressService.createOne({
      ...payload,
      user_id: userJwt.sub,
    });
    this.trx.commit();
    return res;
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() payload: UpdateAddressDto,
  ): Promise<AddressEntity> {
    const res = await this.AddressService.updateOne(id, payload);
    this.trx.commit();
    return res;
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<AddressEntity> {
    const res = this.AddressService.deleteOne(id);
    this.trx.commit();
    return res;
  }
}
