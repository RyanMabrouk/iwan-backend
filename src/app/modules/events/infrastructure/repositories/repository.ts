import { NewEvent } from './../entity/entity';
import { Inject } from '@nestjs/common';
import { UpdateEventDto } from '../../dto/update.dto';
import { QueryEventDto } from '../../dto/query.dto';
import {
  KyselyEventEntity,
  IEventPopulated,
  EventEntity,
} from '../entity/entity';
import { GenericRepository } from 'src/app/shared/types/GenericRepository';
import { TRANSACTION_PROVIDER } from 'src/app/database/conf/constants';
import { ITransaction } from 'src/app/database/types/transaction';
import { PostgresError } from 'src/app/shared/Errors/PostgresError';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { NewEventBooks } from '../entity/eventBooks';

export class EventRepository
  implements
    GenericRepository<KyselyEventEntity, UpdateEventDto, QueryEventDto>
{
  constructor(
    @Inject(TRANSACTION_PROVIDER) private readonly trx: ITransaction,
  ) {}
  async findOne({ id }: { id: string }): Promise<IEventPopulated | null> {
    try {
      const res = await this.trx
        .selectFrom('events')
        .where('id', '=', id)
        .selectAll()
        .select((q) => [
          jsonArrayFrom(
            q
              .selectFrom('event_books')
              .whereRef(`event_books.event_id`, '=', `events.id`)
              .innerJoin('books', 'books.id', 'event_books.book_id')
              .select((q) => [
                jsonArrayFrom(
                  q
                    .selectFrom('book_categories')
                    .where(`book_categories.book_id`, '=', id)
                    .innerJoin(
                      'categories',
                      'categories.id',
                      'book_categories.category_id',
                    )
                    .selectAll('categories'),
                ).as('categories'),
              ])
              .selectAll('books'),
          ).as('books'),
        ])
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async findMany(): Promise<EventEntity[]> {
    try {
      const res = await this.trx
        .selectFrom('events')
        .selectAll()
        // .select((q) => [
        //   jsonArrayFrom(
        //     q
        //       .selectFrom('event_books')
        //       .whereRef(`event_books.event_id`, '=', `events.id`)
        //       .innerJoin('books', 'books.id', 'event_books.book_id')
        //       .selectAll('books')
        //       .select((q) => [
        //         jsonArrayFrom(
        //           q
        //             .selectFrom('book_categories')
        //             .whereRef(`book_categories.book_id`, '=', 'books.id')
        //             .innerJoin(
        //               'categories',
        //               'categories.id',
        //               'book_categories.category_id',
        //             )
        //             .selectAll('categories'),
        //         ).as('categories'),
        //       ]),
        //   ).as('books'),
        // ])
        .execute();
      return res;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async updateOne(
    args: {
      id: string;
    } & { payload: UpdateEventDto },
  ): Promise<EventEntity | null> {
    try {
      const res = await this.trx
        .updateTable('events')
        .set({
          ...args.payload,
          updated_at: new Date(),
        })
        .where('id', '=', args.id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async deleteOne({ id }: { id: string }): Promise<EventEntity | null> {
    try {
      const res = await this.trx
        .deleteFrom('events')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async createOne(payload: NewEvent): Promise<EventEntity | null> {
    try {
      const res = await this.trx
        .insertInto('events')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async addBooksToEvent(payload: NewEventBooks[]) {
    try {
      const res = await this.trx
        .insertInto('event_books')
        .values(payload)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }

  async removeBooksFromEvent({
    book_id,
    event_id,
  }: {
    book_id: string;
    event_id: string;
  }) {
    try {
      const res = await this.trx
        .deleteFrom('event_books')
        .where('book_id', '=', book_id)
        .where('event_id', '=', event_id)
        .returningAll()
        .executeTakeFirst();
      return res ?? null;
    } catch (err) {
      throw new PostgresError(err);
    }
  }
}
