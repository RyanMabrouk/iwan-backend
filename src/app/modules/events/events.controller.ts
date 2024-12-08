import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ITransaction } from '../../database/types/transaction';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { EventEntity, IEventPopulated } from './infrastructure/entity/entity';
import { CreateEventDto } from './dto/create.dto';
import { IsPublic } from 'src/app/auth/IsPublic.decorator';
import { EventsService } from './events.service';
import { UpdateEventDto } from './dto/update.dto';
import { AuthenticatedUser } from 'src/app/auth/AuthUser.decorator';
import { ITokenPayload } from 'src/app/shared/types/ITokenPayload';

@Controller({
  path: 'events',
})
export class EventsController {
  constructor(
    private readonly service: EventsService,
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}

  @IsPublic()
  @Get()
  async getMany(): Promise<EventEntity[]> {
    return this.service.findMany();
  }

  @IsPublic()
  @Get(':id')
  async get(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthenticatedUser() userJwt?: ITokenPayload,
  ): Promise<IEventPopulated> {
    return this.service.findOne({ id, user_id: userJwt?.sub });
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateEventDto,
  ): Promise<EventEntity> {
    const updateEntity = await this.service.updateOne({
      id,
      payload: body,
    });
    this.trx.commit();
    return updateEntity;
  }

  @Post()
  async post(@Body() body: CreateEventDto): Promise<EventEntity> {
    const createdEntity = await this.service.createOne({
      payload: body,
    });
    this.trx.commit();
    return createdEntity;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<EventEntity> {
    const deletedEntity = await this.service.deleteOne({ id });
    this.trx.commit();
    return deletedEntity;
  }

  @Post(':event_id/books/:book_id')
  async addCategoryToEvent(
    @Param('event_id', ParseUUIDPipe) event_id: string,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    const res = await this.service.addBooksToEvent([{ book_id, event_id }]);
    this.trx.commit();
    return res;
  }

  @Delete(':event_id/books/:book_id')
  async removeCategoryFromEvent(
    @Param('event_id', ParseUUIDPipe) event_id: string,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    const res = await this.service.removeCategoryFromEvent({
      event_id,
      book_id,
    });
    this.trx.commit();
    return res;
  }
}
