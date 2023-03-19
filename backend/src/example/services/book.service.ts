import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { BOOK_ENTITY_NAME, BOOK_FILE_CATEGORY } from 'src/example/constants';
import { BookCreateDto, BookUpdateDto } from 'src/example/dtos';
import { BookEntity } from 'src/example/entities';
import { BookFindQueryInterface } from 'src/example/interfaces';
import { AuthorRepository, BookRepository } from 'src/example/repositories';
import { OrderEnum } from 'src/library/enums';
import { UtilityService } from 'src/library/services';
import { FileOrderSortEnum, FileStatusEnum } from 'src/platformClient/platformSpaceClient/enums';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { FileResponseType } from 'src/platformClient/platformSpaceClient/types';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    protected bookRepository: BookRepository,
    @InjectRepository(AuthorRepository)
    protected authorRepository: AuthorRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
    protected platformSpaceClientService: PlatformSpaceClientService,
  ) {}

  public async create(bookInput: BookCreateDto): Promise<BookEntity> {
    const { authorId, ...bookData } = bookInput;
    const bookEntity = await this.bookRepository.create(bookData);

    if (authorId) {
      const authorEntity = await this.authorRepository.findOne(authorId);
      if (!authorEntity) {
        throw new NotFoundException(`Author with id ${authorId} not found`);
      }
      bookEntity.author = authorEntity;
    }

    return this.bookRepository.save(bookEntity);
  }

  public async update(id: string, bookInput: BookUpdateDto): Promise<BookEntity> {
    const { authorId, ...bookData } = bookInput;
    const bookEntity = await this.bookRepository.preload({ id, ...bookData });

    if (!bookEntity) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    if (authorId) {
      const authorEntity = await this.authorRepository.findOne(authorId);
      if (!authorEntity) {
        throw new NotFoundException(`Author with id ${authorId} not found`);
      }
      bookEntity.author = authorEntity;
    } else {
      bookEntity.author = null;
    }

    return this.bookRepository.save(bookEntity);
  }

  public async findById(id: string, query: BookFindQueryInterface = {}): Promise<BookEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.bookRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: BookFindQueryInterface): Promise<BookEntity[]> {
    return this.bookRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const bookEntity = await this.bookRepository.buildDeleteQuery({ filter: { id: { equalTo: id } } }).getOne();

    if (!bookEntity) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    const bookEntityId = bookEntity.id;
    await this.bookRepository.remove(bookEntity);

    return bookEntityId;
  }

  public async deleteByIds(query: BookFindQueryInterface): Promise<string[]> {
    const bookEntities = await this.bookRepository.buildDeleteQuery(query).getMany();
    const bookEntitiesIds = bookEntities.map((removedEntity) => removedEntity.id);
    await this.bookRepository.remove(bookEntities);
    return bookEntitiesIds;
  }

  public async findAndCount(query: BookFindQueryInterface): Promise<[BookEntity[], number]> {
    return this.bookRepository.buildSelectQuery(query).getManyAndCount();
  }

  async getFiles(entityIdentifiers: string[]): Promise<FileResponseType[]> {
    return this.platformSpaceClientService.getFiles({
      entityIdentifiers: { valueIn: entityIdentifiers },
      entityName: { equalTo: BOOK_ENTITY_NAME },
      fileCategory: { equalTo: BOOK_FILE_CATEGORY },
      status: { equalTo: FileStatusEnum.ready },
      order: { order: OrderEnum.DESC, sort: FileOrderSortEnum.updatedAt },
    });
  }
}
