import { AccountFilesEntity } from 'src/factoring/entities';
import { AccountFilesFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(AccountFilesEntity)
export class AccountFilesRepository extends BaseRepository<AccountFilesEntity> {
  async findAccountFilesByAccountIds(query: AccountFilesFindQueryInterface): Promise<AccountFilesEntity[][]> {
    const accountFilesEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        accountId: { valueIn: accountIds },
      },
    } = query;
    return accountIds.map((accountId) =>
      accountFilesEntities.filter((accountFileEntity) => accountFileEntity.accountId === accountId),
    );
  }
  buildSelectQuery(query?: AccountFilesFindQueryInterface): SelectQueryBuilder<AccountFilesEntity> {
    return super.buildSelectQuery(query);
  }
}
