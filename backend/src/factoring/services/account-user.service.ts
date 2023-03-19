import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUserCreateDto, AccountUserUpdateDto } from 'src/factoring/dtos';
import { AccountUserEntity } from 'src/factoring/entities';
import { AccountUserFindQueryInterface } from 'src/factoring/interfaces';
import { AccountRepository, AccountUserRepository } from 'src/factoring/repositories';
import { UtilityService } from 'src/library/services';

@Injectable()
export class AccountUserService {
  constructor(
    @InjectRepository(AccountUserRepository)
    protected accountUserRepository: AccountUserRepository,
    @InjectRepository(AccountRepository)
    protected accountRepository: AccountRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
  ) {}

  public async create(accountUserInput: AccountUserCreateDto): Promise<AccountUserEntity> {
    const { accountId, ...accountUserData } = accountUserInput;
    const accountUserEntity = await this.accountUserRepository.create(accountUserData);

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      accountUserEntity.account = accountEntity;
    }

    return this.accountUserRepository.save(accountUserEntity);
  }

  public async update(id: string, accountUserInput: AccountUserUpdateDto): Promise<AccountUserEntity> {
    const { accountId, ...accountUserData } = accountUserInput;
    const accountUserEntity = await this.accountUserRepository.preload({ id, ...accountUserData });

    if (!accountUserEntity) {
      throw new NotFoundException(`AccountUser with id ${id} not found`);
    }

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      accountUserEntity.account = accountEntity;
    } else {
      accountUserEntity.account = null;
    }

    return this.accountUserRepository.save(accountUserEntity);
  }

  public async findById(id: string, query: AccountUserFindQueryInterface = {}): Promise<AccountUserEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.accountUserRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: AccountUserFindQueryInterface): Promise<AccountUserEntity[]> {
    return this.accountUserRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const accountUserEntity = await this.accountUserRepository
      .buildDeleteQuery({ filter: { id: { equalTo: id } } })
      .getOne();

    if (!accountUserEntity) {
      throw new NotFoundException(`AccountUser with id ${id} not found`);
    }
    const accountUserEntityId = accountUserEntity.id;
    await this.accountUserRepository.remove(accountUserEntity);

    return accountUserEntityId;
  }

  public async deleteByIds(query: AccountUserFindQueryInterface): Promise<string[]> {
    const accountUserEntities = await this.accountUserRepository.buildDeleteQuery(query).getMany();
    const accountUserEntitiesIds = accountUserEntities.map((removedEntity) => removedEntity.id);
    await this.accountUserRepository.remove(accountUserEntities);
    return accountUserEntitiesIds;
  }

  public async findAndCount(query: AccountUserFindQueryInterface): Promise<[AccountUserEntity[], number]> {
    return this.accountUserRepository.buildSelectQuery(query).getManyAndCount();
  }
}
