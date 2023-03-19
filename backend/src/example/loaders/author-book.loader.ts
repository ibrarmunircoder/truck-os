import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { BookEntity } from 'src/example/entities';
import { BookFindQueryInterface } from 'src/example/interfaces';
import { BookRepository } from 'src/example/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AuthorBookLoader
  implements NestDataLoader<BookFindQueryInterface, BookEntity[]>
{
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
    private readonly configService: ConfigService
  ) {}

  generateDataLoader(): DataLoader<BookFindQueryInterface, BookEntity[]> {
    return new DataLoader<BookFindQueryInterface, BookEntity[]>(
      (query: BookFindQueryInterface[]) => {
        const q = {
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            authorId: {
              valueIn: query.reduce(
                (acc, cur) => [...acc, cur.filter.authorId.equalTo],
                []
              ),
            },
          },
        };
        return this.bookRepository.findBooksByAuthorIds(q);
      }
    );
  }
}
