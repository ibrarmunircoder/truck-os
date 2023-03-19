import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { AccountEntity } from 'src/factoring/entities';
import { AccountFindQueryInterface } from 'src/factoring/interfaces';
import { AccountRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AccountLoader implements NestDataLoader<AccountFindQueryInterface, AccountEntity> {
  constructor(
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<AccountFindQueryInterface, AccountEntity> {
    return new DataLoader<AccountFindQueryInterface, AccountEntity>(async (query: AccountFindQueryInterface[]) => {
      const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
      const data = await this.accountRepository
        .buildSelectQuery({
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: { id: { valueIn: ids } },
        })
        .getMany();
      return Promise.resolve(ids.map((id) => data.find((record) => record.id === id)));
    });
  }
}
