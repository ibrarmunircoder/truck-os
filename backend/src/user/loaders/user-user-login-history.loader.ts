import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { UserLoginHistoryRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserUserLoginHistoryLoader
  implements NestDataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity[]> {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity[]> {
    return new DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity[]>(
      (query: UserLoginHistoryFindQueryInterface[]) => {
        const q = {
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            userId: {
              valueIn: query.reduce((acc, cur) => [...acc, cur.filter.userId.equalTo], []),
            },
          },
        };
        return this.userLoginHistoryRepository.findUserLoginHistoriesByUserIds(q);
      },
    );
  }
}
