import { DebtorEntity } from 'src/factoring/entities';
import { DebtorFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(DebtorEntity)
export class DebtorRepository extends BaseRepository<DebtorEntity> {
  async findDebtorsByAccountIds(query: DebtorFindQueryInterface): Promise<DebtorEntity[][]> {
    const debtorEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        accountId: { valueIn: accountIds },
      },
    } = query;
    return accountIds.map((accountId) => debtorEntities.filter((debtorEntity) => debtorEntity.accountId === accountId));
  }

  buildSelectQuery(query?: DebtorFindQueryInterface): SelectQueryBuilder<DebtorEntity> {
    return super.buildSelectQuery(query);
  }
}
