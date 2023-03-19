import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OrderEnum } from 'src/library/enums';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryOrderSortEnum } from 'src/user/enums';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { UserLoginHistoryRepository } from 'src/user/repositories';

@Injectable()
export class UserInternalLastLoginActivityLoader
  implements NestDataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity>
{
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private readonly userLoginHistoryRepository: UserLoginHistoryRepository,
  ) {}

  generateDataLoader(): DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity> {
    return new DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity>(
      async (query: UserLoginHistoryFindQueryInterface[]) => {
        const userIds = query.reduce((acc, cur) => [...acc, cur.filter.userId.equalTo], []);
        const data = await this.userLoginHistoryRepository
          .buildSelectQuery()
          .where('user_login_history.userId IN (:...userIds)', { userIds })
          .orderBy('user_login_history.userId')
          .addOrderBy(`user_login_history.${UserLoginHistoryOrderSortEnum.TIMESTAMP}`, OrderEnum.DESC)
          .groupBy('user_login_history.id')
          .addGroupBy('user_login_history.userId')
          .distinctOn(['user_login_history.userId'])
          .getMany();
        return Promise.resolve(userIds.map((id) => data.find((record) => record.userId === id)));
      },
    );
  }
}
