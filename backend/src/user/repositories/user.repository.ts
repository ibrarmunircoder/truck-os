import { BaseRepository } from 'src/library/repositories';
import { UserEntity } from 'src/user/entities';
import { UserFindQueryInterface } from 'src/user/interfaces';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  buildSelectQuery(query?: UserFindQueryInterface): SelectQueryBuilder<UserEntity> {
    return super.buildSelectQuery(query);
  }
}
