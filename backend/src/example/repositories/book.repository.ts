import { BookEntity } from 'src/example/entities';
import { BookFindQueryInterface } from 'src/example/interfaces';
import { BaseRepository } from 'src/library/repositories';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';

@EntityRepository(BookEntity)
export class BookRepository extends BaseRepository<BookEntity> {
  async findBooksByAuthorIds(
    query: BookFindQueryInterface
  ): Promise<BookEntity[][]> {
    const bookEntities = await this.buildSelectQuery(query).getMany();
    const {
      filter: {
        authorId: { valueIn: authorIds },
      },
    } = query;
    return authorIds.map((authorId) =>
      bookEntities.filter((bookEntity) => bookEntity.authorId === authorId)
    );
  }

  buildSelectQuery(
    query?: BookFindQueryInterface
  ): SelectQueryBuilder<BookEntity> {
    return super.buildSelectQuery(query);
  }
}
