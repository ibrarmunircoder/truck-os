import { DebtorRepresentativeEntity } from 'src/factoring/entities';
import { DebtorRepresentativeFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(DebtorRepresentativeEntity)
export class DebtorRepresentativeRepository extends BaseRepository<DebtorRepresentativeEntity> {
  async findDebtorRepresentativesByDebtorIds(
    query: DebtorRepresentativeFindQueryInterface,
  ): Promise<DebtorRepresentativeEntity[][]> {
    const debtorRepresentativeEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        debtorId: { valueIn: debtorIds },
      },
    } = query;
    return debtorIds.map((debtorId) =>
      debtorRepresentativeEntities.filter(
        (debtorRepresentativeEntity) => debtorRepresentativeEntity.debtorId === debtorId,
      ),
    );
  }

  buildSelectQuery(query?: DebtorRepresentativeFindQueryInterface): SelectQueryBuilder<DebtorRepresentativeEntity> {
    return super.buildSelectQuery(query);
  }
}
