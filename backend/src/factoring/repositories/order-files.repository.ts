import { OrderFilesEntity } from 'src/factoring/entities';
import { OrderFilesFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(OrderFilesEntity)
export class OrderFilesRepository extends BaseRepository<OrderFilesEntity> {
  async findOrderFilesByOrderIds(query: OrderFilesFindQueryInterface): Promise<OrderFilesEntity[][]> {
    const orderFilesEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        orderId: { valueIn: orderIds },
      },
    } = query;
    return orderIds.map((orderId) =>
      orderFilesEntities.filter((orderFilesEntity) => orderFilesEntity.orderId === orderId),
    );
  }
  buildSelectQuery(query?: OrderFilesFindQueryInterface): SelectQueryBuilder<OrderFilesEntity> {
    return super.buildSelectQuery(query);
  }
}
