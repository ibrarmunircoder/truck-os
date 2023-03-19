import { AccountUserEntity } from 'src/factoring/entities';
import { AccountUserFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(AccountUserEntity)
export class AccountUserRepository extends BaseRepository<AccountUserEntity> {
  async findAccountUsersByAccountIds(query: AccountUserFindQueryInterface): Promise<AccountUserEntity[][]> {
    const accountUserEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        accountId: { valueIn: accountIds },
      },
    } = query;
    return accountIds.map((accountId) =>
      accountUserEntities.filter((accountUserEntity) => accountUserEntity.accountId === accountId),
    );
  }

  buildSelectQuery(query?: AccountUserFindQueryInterface): SelectQueryBuilder<AccountUserEntity> {
    return super.buildSelectQuery(query);
  }
}
