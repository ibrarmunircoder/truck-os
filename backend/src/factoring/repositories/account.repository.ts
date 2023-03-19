import { AccountEntity } from 'src/factoring/entities';
import { AccountFindQueryInterface } from 'src/factoring/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(AccountEntity)
export class AccountRepository extends BaseRepository<AccountEntity> {
  buildSelectQuery(query?: AccountFindQueryInterface): SelectQueryBuilder<AccountEntity> {
    return super.buildSelectQuery(query);
  }
}
