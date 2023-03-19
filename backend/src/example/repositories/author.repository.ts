import { AuthorEntity } from 'src/example/entities';
import { AuthorFindQueryInterface } from 'src/example/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends BaseRepository<AuthorEntity> {
  buildSelectQuery(
    query?: AuthorFindQueryInterface
  ): SelectQueryBuilder<AuthorEntity> {
    return super.buildSelectQuery(query);
  }
}
