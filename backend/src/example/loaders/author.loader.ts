import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { AuthorEntity } from 'src/example/entities';
import { AuthorFindQueryInterface } from 'src/example/interfaces';
import { AuthorRepository } from 'src/example/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AuthorLoader
  implements NestDataLoader<AuthorFindQueryInterface, AuthorEntity>
{
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
    private readonly configService: ConfigService
  ) {}

  generateDataLoader(): DataLoader<AuthorFindQueryInterface, AuthorEntity> {
    return new DataLoader<AuthorFindQueryInterface, AuthorEntity>(
      async (query: AuthorFindQueryInterface[]) => {
        const ids = query.reduce(
          (acc, cur) => [...acc, cur.filter.id.equalTo],
          []
        );
        const data = await this.authorRepository
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
