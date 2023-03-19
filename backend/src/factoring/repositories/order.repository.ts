import { OrderEntity } from 'src/factoring/entities';
import { OrderFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
  async findOrdersByAccountIds(query: OrderFindQueryInterface): Promise<OrderEntity[][]> {
    const orderEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        accountId: { valueIn: accountIds },
      },
    } = query;
    return accountIds.map((accountId) => orderEntities.filter((orderEntity) => orderEntity.accountId === accountId));
  }

  async findOrdersByDebtorIds(query: OrderFindQueryInterface): Promise<OrderEntity[][]> {
    const orderEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        debtorId: { valueIn: debtorIds },
      },
    } = query;
    return debtorIds.map((debtorId) => orderEntities.filter((orderEntity) => orderEntity.debtorId === debtorId));
  }

  buildSelectQuery(query?: OrderFindQueryInterface): SelectQueryBuilder<OrderEntity> {
    return super.buildSelectQuery(query);
  }
}
