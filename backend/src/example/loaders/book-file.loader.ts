import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
import { BookFileFindQueryInterface } from 'src/example/interfaces';
import { BookFileModel } from 'src/example/models';
import { BookService } from 'src/example/services';

@Injectable()
export class BookFileLoader implements NestDataLoader<BookFileFindQueryInterface, BookFileModel[]> {
  constructor(private readonly bookService: BookService) {}
  generateDataLoader(): DataLoader<BookFileFindQueryInterface, BookFileModel[]> {
    return new DataLoader<BookFileFindQueryInterface, BookFileModel[]>(async (keys: BookFileFindQueryInterface[]) => {
      const entityIdentifiers = _.compact(
        keys.map((key) => key.id),
        undefined,
      );
      const result = entityIdentifiers?.length ? await this.bookService.getFiles(entityIdentifiers) : [];
      return keys.map((key) =>
        result?.filter((file) => !!file.fileAssociations.data.find((d) => d.entityIdentifier === key.id)),
      );
    });
  }
}
