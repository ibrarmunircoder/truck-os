import { plainToClass } from 'class-transformer';
import { BookEntity } from 'src/example/entities';
import { BookModel } from 'src/example/models';

export function mapBookToModel(bookEntity: BookEntity): BookModel {
  const bookModel = plainToClass(BookModel, bookEntity);
  return bookModel;
}
