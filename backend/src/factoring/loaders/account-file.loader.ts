import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { AccountFilesEntity } from 'src/factoring/entities';
import { AccountFilesFindQueryInterface } from 'src/factoring/interfaces';
import { AccountFileModel } from 'src/factoring/models';
import { AccountFilesRepository } from 'src/factoring/repositories';

@Injectable()
export class AccountFileLoader implements NestDataLoader<AccountFilesFindQueryInterface, AccountFileModel[]> {
  constructor(private readonly accountFilesRepository: AccountFilesRepository) {}
  generateDataLoader(): DataLoader<AccountFilesFindQueryInterface, AccountFilesEntity[]> {
    // eslint-disable-next-line max-len
    return new DataLoader<AccountFilesFindQueryInterface, AccountFilesEntity[]>(
      async (query: AccountFilesFindQueryInterface[]) => {
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
        return this.accountFilesRepository.findAccountFilesByAccountIds(q);
      },
    );
  }
}
