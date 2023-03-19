import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { UserLoginHistoryRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserLoginHistoryLoader
  implements NestDataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity> {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity> {
    return new DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity>(
      async (query: UserLoginHistoryFindQueryInterface[]) => {
        const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
        const data = await this.userLoginHistoryRepository
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
