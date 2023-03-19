import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { DebtorCreateDto, DebtorUpdateDto, FindDebtorDto } from 'src/factoring/dtos';
import { DebtorEntity } from 'src/factoring/entities';
import { DebtorFindQueryInterface } from 'src/factoring/interfaces';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import { DebtorInfoInterface, DebtorListInterface } from 'src/factoring/providers/interfaces';
import { AccountRepository, DebtorRepository } from 'src/factoring/repositories';
import { ClsKeyEnum } from 'src/library/enums';
import { UtilityService } from 'src/library/services';

@Injectable()
export class DebtorService {
  constructor(
    @InjectRepository(DebtorRepository)
    protected debtorRepository: DebtorRepository,
    @InjectRepository(AccountRepository)
    protected accountRepository: AccountRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
    protected readonly cls: ClsService,
    private readonly walbingPaymentProcessorServiceProvider: WalbingPaymentProcessorServiceProvider,
  ) {}

  public async create(debtorInput: DebtorCreateDto): Promise<DebtorEntity> {
    const { accountId, ...debtorData } = debtorInput;
    const debtorDetails = {
      ...debtorData,
      debtorReferenceId: null,
    };
    const debtorEntity = await this.debtorRepository.create(debtorDetails);

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      debtorEntity.account = accountEntity;
    }

    return this.debtorRepository.save(debtorEntity);
  }

  public async update(id: string, debtorInput: DebtorUpdateDto): Promise<DebtorEntity> {
    const { accountId, ...debtorData } = debtorInput;
    const debtorEntity = await this.debtorRepository.preload({ id, ...debtorData });

    if (!debtorEntity) {
      throw new NotFoundException(`Debtor with id ${id} not found`);
    }

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      debtorEntity.account = accountEntity;
    } else {
      debtorEntity.account = null;
    }

    return this.debtorRepository.save(debtorEntity);
  }

  public async findById(id: string, query: DebtorFindQueryInterface = {}): Promise<DebtorEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.debtorRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: DebtorFindQueryInterface): Promise<DebtorEntity[]> {
    return this.debtorRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const debtorEntity = await this.debtorRepository.buildDeleteQuery({ filter: { id: { equalTo: id } } }).getOne();

    if (!debtorEntity) {
      throw new NotFoundException(`Debtor with id ${id} not found`);
    }
    const debtorEntityId = debtorEntity.id;
    await this.debtorRepository.remove(debtorEntity);

    return debtorEntityId;
  }

  public async deleteByIds(query: DebtorFindQueryInterface): Promise<string[]> {
    const debtorEntities = await this.debtorRepository.buildDeleteQuery(query).getMany();
    const debtorEntitiesIds = debtorEntities.map((removedEntity) => removedEntity.id);
    await this.debtorRepository.remove(debtorEntities);
    return debtorEntitiesIds;
  }

  public async findAndCount(query: DebtorFindQueryInterface): Promise<[DebtorEntity[], number]> {
    return this.debtorRepository.buildSelectQuery(query).getManyAndCount();
  }

  public async searchWalbingDebtors(name: string): Promise<DebtorInfoInterface[]> {
    return this.walbingPaymentProcessorServiceProvider.searchDebtors(name);
  }

  public async getDebtorsList(): Promise<DebtorListInterface[]> {
    return this.walbingPaymentProcessorServiceProvider.getDebtorsList();
  }

  public async findDebtor(debtorInput: FindDebtorDto): Promise<DebtorEntity> {
    const userId = this.cls.get(ClsKeyEnum.USER_ID);
    if (!userId) {
      return;
    }

    let account;
    if (userId) {
      account = await this.accountRepository
        .buildSelectQuery({
          filter: { userId: { equalTo: userId } },
        })
        .getOne();
    }

    if (!account) {
      return;
    }

    let filterParams = {};
    if (debtorInput.vatNumber) {
      filterParams = {
        accountId: account.id,
        vatNumber: debtorInput.vatNumber,
      };
    } else {
      filterParams = {
        accountId: account.id,
        commercialRegister: debtorInput.commercialRegister,
        commercialRegisterNumber: debtorInput.commercialRegisterNumber,
      };
    }
    return this.debtorRepository.findOne(filterParams);
  }
}
