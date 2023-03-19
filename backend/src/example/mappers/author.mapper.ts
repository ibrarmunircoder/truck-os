import { plainToClass } from 'class-transformer';
import { AuthorEntity } from 'src/example/entities';
import { AuthorModel } from 'src/example/models';

export function mapAuthorToModel(authorEntity: AuthorEntity): AuthorModel {
  const authorModel = plainToClass(AuthorModel, authorEntity);
  return authorModel;
}
