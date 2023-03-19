import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { DebtorRepresentativeEntity } from 'src/factoring/entities';
import { DebtorRepresentativeFindQueryInterface } from 'src/factoring/interfaces';
import { DebtorRepresentativeRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class DebtorRepresentativeLoader
  implements NestDataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity>
{
  constructor(
    @InjectRepository(DebtorRepresentativeRepository)
    private readonly debtorRepresentativeRepository: DebtorRepresentativeRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity> {
    return new DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity>(
      async (query: DebtorRepresentativeFindQueryInterface[]) => {
        const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
        const data = await this.debtorRepresentativeRepository
          .buildSelectQuery({
            fields: query
              .reduce((acc, cur) => [...acc, ...cur.fields], [])
              .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
            filter: { id: { valueIn: ids } },
          })
          .getMany();
        return Promise.resolve(ids.map((id) => data.find((record) => record.id === id)));
      },
    );
  }
}
