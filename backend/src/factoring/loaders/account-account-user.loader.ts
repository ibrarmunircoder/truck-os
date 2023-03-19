import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { AccountUserEntity } from 'src/factoring/entities';
import { AccountUserFindQueryInterface } from 'src/factoring/interfaces';
import { AccountUserRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AccountAccountUserLoader implements NestDataLoader<AccountUserFindQueryInterface, AccountUserEntity[]> {
  constructor(
    @InjectRepository(AccountUserRepository)
    private readonly accountUserRepository: AccountUserRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<AccountUserFindQueryInterface, AccountUserEntity[]> {
    return new DataLoader<AccountUserFindQueryInterface, AccountUserEntity[]>(
      (query: AccountUserFindQueryInterface[]) => {
        const q = {
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            accountId: {
              valueIn: query.reduce((acc, cur) => [...acc, cur.filter.accountId.equalTo], []),
            },
          },
        };
        return this.accountUserRepository.findAccountUsersByAccountIds(q);
      },
    );
  }
}
