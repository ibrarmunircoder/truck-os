import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OrderEntity } from 'src/factoring/entities';
import { OrderFindQueryInterface } from 'src/factoring/interfaces';
import { OrderRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class AccountOrderLoader implements NestDataLoader<OrderFindQueryInterface, OrderEntity[]> {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<OrderFindQueryInterface, OrderEntity[]> {
    return new DataLoader<OrderFindQueryInterface, OrderEntity[]>((query: OrderFindQueryInterface[]) => {
      const q = {
        fields: query
          .reduce((acc, cur) => [...acc, ...cur.fields], [])
          .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
        filter: {
          accountId: {
            valueIn: query.reduce((acc, cur) => [...acc, cur.filter.accountId.equalTo], []),
          },
        },
      };
      return this.orderRepository.findOrdersByAccountIds(q);
    });
  }
}
