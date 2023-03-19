import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { AccountUserEntity } from 'src/factoring/entities';
import { AccountUserFindQueryInterface } from 'src/factoring/interfaces';
import { AccountUserRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AccountUserLoader implements NestDataLoader<AccountUserFindQueryInterface, AccountUserEntity> {
  constructor(
    @InjectRepository(AccountUserRepository)
    private readonly accountUserRepository: AccountUserRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<AccountUserFindQueryInterface, AccountUserEntity> {
    return new DataLoader<AccountUserFindQueryInterface, AccountUserEntity>(
      async (query: AccountUserFindQueryInterface[]) => {
        const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
        const data = await this.accountUserRepository
          .buildSelectQuery({
            fields: query
              .reduce((acc, cur) => [...acc, ...cur.fields], [])
              .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
            filter: { id: { valueIn: ids } },
          })
          .getMany();
        return Promise.resolve(ids.map((id) => data.find((record) => record.id === id)));
      },
    );
  }
}
