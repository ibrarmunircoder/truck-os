import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { InjectS3, S3 } from 'nestjs-s3';
import { ACCOUNT_ALLOWED_TRADE_DOCUMENTS } from 'src/factoring/constants';
import { AccountCreateDto, AccountFileCreateDto, AccountSubmitDto, AccountUpdateDto } from 'src/factoring/dtos';
import { AccountEntity, AccountFilesEntity } from 'src/factoring/entities';
import { AccountKycStatusEnum } from 'src/factoring/enums';
import {
  AccountFilesFindQueryInterface,
  AccountFindQueryInterface,
  AccountLegalStructure,
  AccountRegisterCourtInterface,
} from 'src/factoring/interfaces';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import { PaymentDetailsInterface } from 'src/factoring/providers/interfaces';
import { AccountFilesRepository, AccountRepository } from 'src/factoring/repositories';
import { UtilityService } from 'src/library/services';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountRepository)
    protected accountRepository: AccountRepository,
    @InjectRepository(AccountFilesRepository)
    protected accountFilesRepository: AccountFilesRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
    private readonly walbingPaymentProcessorServiceProvider: WalbingPaymentProcessorServiceProvider,
    @InjectS3() private readonly s3: S3,
  ) {}

  public async create(accountInput: AccountCreateDto): Promise<AccountEntity> {
    const { ...accountData } = accountInput;
    const accountEntity = await this.accountRepository.create(accountData);

    return this.accountRepository.save(accountEntity);
  }

  public async update(id: string, accountInput: AccountUpdateDto): Promise<AccountEntity> {
    const { ...accountData } = accountInput;
    const accountEntity = await this.accountRepository.preload({ id, ...accountData });

    if (!accountEntity) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return this.accountRepository.save(accountEntity);
  }

  public async findById(id: string, query: AccountFindQueryInterface = {}): Promise<AccountEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.accountRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: AccountFindQueryInterface): Promise<AccountEntity[]> {
    return this.accountRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const accountEntity = await this.accountRepository.buildDeleteQuery({ filter: { id: { equalTo: id } } }).getOne();

    if (!accountEntity) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    const accountEntityId = accountEntity.id;
    await this.accountRepository.remove(accountEntity);

    return accountEntityId;
  }

  public async deleteByIds(query: AccountFindQueryInterface): Promise<string[]> {
    const accountEntities = await this.accountRepository.buildDeleteQuery(query).getMany();
    const accountEntitiesIds = accountEntities.map((removedEntity) => removedEntity.id);
    await this.accountRepository.remove(accountEntities);
    return accountEntitiesIds;
  }
  public async deleteAccountFiles(query: AccountFilesFindQueryInterface): Promise<string[]> {
    const accountFilesEntities = await this.accountFilesRepository.buildDeleteQuery(query).getMany();
    const accountEntitiesIds = accountFilesEntities.map((accountFilesEntity) => accountFilesEntity.id);
    await this.accountFilesRepository.remove(accountFilesEntities);
    return accountEntitiesIds;
  }

  public async findAndCount(query: AccountFindQueryInterface): Promise<[AccountEntity[], number]> {
    return this.accountRepository.buildSelectQuery(query).getManyAndCount();
  }

  public async getAccountVirtualDetails(): Promise<PaymentDetailsInterface> {
    return this.walbingPaymentProcessorServiceProvider.getPaymentDetails();
  }

  public async getTradeDocument(account: AccountEntity): Promise<Buffer> {
    if (ACCOUNT_ALLOWED_TRADE_DOCUMENTS.includes(account.legalForm)) {
      const accountFiles = await this.getAccountFiles({
        filter: { accountId: { equalTo: account.id } },
      });
      const url = accountFiles[0].getSignedURL;
      if (accountFiles.length) {
        const response = await axios.get<Buffer>(url, {
          responseType: 'arraybuffer',
        });
        return response.data;
      }
    }

    return null;
  }

  public async registerCompany(accountData: AccountSubmitDto, user: UserEntity): Promise<boolean> {
    const account = await this.findById(accountData.id);
    if (account && account.kycStatus === AccountKycStatusEnum.SUBMITTED) {
      throw new BadRequestException('Company is already submitted!');
    }
    const file = await this.getTradeDocument(account);
    const registered = await this.walbingPaymentProcessorServiceProvider.register(accountData, user, file);
    if (registered) {
      await this.update(accountData.id, { kycStatus: AccountKycStatusEnum.SUBMITTED });
      return registered;
    }
  }

  public async accountLegalStructures(country: string): Promise<AccountLegalStructure[]> {
    return this.walbingPaymentProcessorServiceProvider.getLegalStructures(country);
  }
  public async accountRegisterCourts(country: string): Promise<AccountRegisterCourtInterface[]> {
    return this.walbingPaymentProcessorServiceProvider.getRegisterCourts(country);
  }

  public async createAccountFile(accountFile: AccountFileCreateDto): Promise<AccountFilesEntity> {
    const accountFilesEntity = await this.accountFilesRepository.create(accountFile);
    return this.accountFilesRepository.save(accountFilesEntity);
  }
  public async getAccountFiles(query: AccountFilesFindQueryInterface): Promise<AccountFilesEntity[]> {
    return this.accountFilesRepository.buildSelectQuery(query).getMany();
  }
}
