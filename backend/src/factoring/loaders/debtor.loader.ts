import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { DebtorEntity } from 'src/factoring/entities';
import { DebtorFindQueryInterface } from 'src/factoring/interfaces';
import { DebtorRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class DebtorLoader implements NestDataLoader<DebtorFindQueryInterface, DebtorEntity> {
  constructor(
    @InjectRepository(DebtorRepository)
    private readonly debtorRepository: DebtorRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<DebtorFindQueryInterface, DebtorEntity> {
    return new DataLoader<DebtorFindQueryInterface, DebtorEntity>(async (query: DebtorFindQueryInterface[]) => {
      const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
      const data = await this.debtorRepository
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
