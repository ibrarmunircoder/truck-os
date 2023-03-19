import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OrderEntity } from 'src/factoring/entities';
import { OrderFindQueryInterface } from 'src/factoring/interfaces';
import { OrderRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class OrderLoader implements NestDataLoader<OrderFindQueryInterface, OrderEntity> {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<OrderFindQueryInterface, OrderEntity> {
    return new DataLoader<OrderFindQueryInterface, OrderEntity>(async (query: OrderFindQueryInterface[]) => {
      const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
      const data = await this.orderRepository
        .buildSelectQuery({
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: { id: { valueIn: ids } },
        })
        .getMany();
      return Promise.resolve(ids.map((id) => data.find((record) => record.id === id)));
    });
  }
}
