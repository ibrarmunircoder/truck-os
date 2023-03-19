import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { DebtorRepresentativeEntity } from 'src/factoring/entities';
import { DebtorRepresentativeFindQueryInterface } from 'src/factoring/interfaces';
import { DebtorRepresentativeRepository } from 'src/factoring/repositories';

@Injectable({ scope: Scope.REQUEST })
export class DebtorDebtorRepresentativeLoader
  implements NestDataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity[]>
{
  constructor(
    @InjectRepository(DebtorRepresentativeRepository)
    private readonly debtorRepresentativeRepository: DebtorRepresentativeRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity[]> {
    return new DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity[]>(
      (query: DebtorRepresentativeFindQueryInterface[]) => {
        const q = {
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: {
            debtorId: {
              valueIn: query.reduce((acc, cur) => [...acc, cur.filter.debtorId.equalTo], []),
            },
          },
        };
        return this.debtorRepresentativeRepository.findDebtorRepresentativesByDebtorIds(q);
      },
    );
  }
}
