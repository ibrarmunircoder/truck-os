import { BaseRepository } from 'src/library/repositories';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserLoginHistoryEntity)
export class UserLoginHistoryRepository extends BaseRepository<UserLoginHistoryEntity> {
  async findUserLoginHistoriesByUserIds(
    query: UserLoginHistoryFindQueryInterface,
  ): Promise<UserLoginHistoryEntity[][]> {
    const userLoginHistoryEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        userId: { valueIn: userIds },
      },
    } = query;
    return userIds.map((userId) =>
      userLoginHistoryEntities.filter((userLoginHistoryEntity) => userLoginHistoryEntity.userId === userId),
    );
  }

  async findLastLoginActivityByUserIds(query: UserLoginHistoryFindQueryInterface): Promise<UserLoginHistoryEntity[]> {
    const {
      filter: {
        userId: { valueIn: userIds },
      },
      order: { sort, order: sortOrder },
    } = query;

    const userLoginHistoryEntities = await this.createQueryBuilder('user_login_history')
      .where('user_login_history.userId IN (:...userIds)', { userIds })
      .orderBy('user_login_history.userId')
      .addOrderBy(`user_login_history.${sort}`, sortOrder)
      .groupBy('user_login_history.id')
      .addGroupBy('user_login_history.userId')
      .distinctOn(['user_login_history.userId'])
      .getMany();

    return userLoginHistoryEntities;
  }
}
