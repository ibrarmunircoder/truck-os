import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BookEntity } from 'src/example/entities';
import { BookFindQueryInterface } from 'src/example/interfaces';
import { BookRepository } from 'src/example/repositories';

@Injectable({ scope: Scope.REQUEST })
export class BookLoader
  implements NestDataLoader<BookFindQueryInterface, BookEntity>
{
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly configService: ConfigService
  ) {}

  generateDataLoader(): DataLoader<BookFindQueryInterface, BookEntity> {
    return new DataLoader<BookFindQueryInterface, BookEntity>(
      async (query: BookFindQueryInterface[]) => {
        const ids = query.reduce(
          (acc, cur) => [...acc, cur.filter.id.equalTo],
          []
        );
        const data = await this.bookRepository
          .buildSelectQuery({
            fields: query
              .reduce((acc, cur) => [...acc, ...cur.fields], [])
              .filter(
                (field, i, arr) => arr.findIndex((f) => f === field) === i
              ),
            filter: { id: { valueIn: ids } },
          })
          .getMany();
        return Promise.resolve(
          ids.map((id) => data.find((record) => record.id === id))
        );
      }
    );
  }
}
