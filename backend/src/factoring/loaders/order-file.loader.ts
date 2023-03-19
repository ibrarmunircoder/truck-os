import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { OrderFilesEntity } from 'src/factoring/entities';
import { OrderFilesFindQueryInterface } from 'src/factoring/interfaces';
import { OrderFileModel } from 'src/factoring/models';
import { OrderFilesRepository } from 'src/factoring/repositories';

@Injectable()
export class OrderFileLoader implements NestDataLoader<OrderFilesFindQueryInterface, OrderFileModel[]> {
  constructor(private readonly orderFilesRepository: OrderFilesRepository) {}
  generateDataLoader(): DataLoader<OrderFilesFindQueryInterface, OrderFilesEntity[]> {
    // eslint-disable-next-line max-len
    return new DataLoader<OrderFilesFindQueryInterface, OrderFilesEntity[]>(
      async (query: OrderFilesFindQueryInterface[]) => {
        const q = {
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            orderId: {
              valueIn: query.reduce((acc, cur) => [...acc, cur.filter.orderId.equalTo], []),
            },
          },
        };
        return this.orderFilesRepository.findOrderFilesByOrderIds(q);
      },
    );
  }
}
