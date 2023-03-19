import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorCreateDto, AuthorUpdateDto } from 'src/example/dtos';
import { AuthorEntity } from 'src/example/entities';
import { AuthorFindQueryInterface } from 'src/example/interfaces';
import { AuthorRepository } from 'src/example/repositories';
import { UtilityService } from 'src/library/services';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    protected authorRepository: AuthorRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService
  ) {}

  public async create(authorInput: AuthorCreateDto): Promise<AuthorEntity> {
    const { ...authorData } = authorInput;
    const authorEntity = await this.authorRepository.create(authorData);

    return this.authorRepository.save(authorEntity);
  }

  public async update(
    id: string,
    authorInput: AuthorUpdateDto
  ): Promise<AuthorEntity> {
    const { ...authorData } = authorInput;
    const authorEntity = await this.authorRepository.preload({
      id,
      ...authorData,
    });

    if (!authorEntity) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    return this.authorRepository.save(authorEntity);
  }

  public async findById(
    id: string,
    query: AuthorFindQueryInterface = {}
  ): Promise<AuthorEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.authorRepository
      .buildSelectQuery({ filter: { id: { equalTo: id } } })
      .getOne();
  }

  public async find(query: AuthorFindQueryInterface): Promise<AuthorEntity[]> {
    return this.authorRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const authorEntity = await this.authorRepository
      .buildDeleteQuery({ filter: { id: { equalTo: id } } })
      .getOne();

    if (!authorEntity) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    const authorEntityId = authorEntity.id;
    await this.authorRepository.remove(authorEntity);

    return authorEntityId;
  }

  public async deleteByIds(query: AuthorFindQueryInterface): Promise<string[]> {
    const authorEntities = await this.authorRepository
      .buildDeleteQuery(query)
      .getMany();
    const authorEntitiesIds = authorEntities.map(
      (removedEntity) => removedEntity.id
    );
    await this.authorRepository.remove(authorEntities);
    return authorEntitiesIds;
  }

  public async findAndCount(
    query: AuthorFindQueryInterface
  ): Promise<[AuthorEntity[], number]> {
    return this.authorRepository.buildSelectQuery(query).getManyAndCount();
  }
}
