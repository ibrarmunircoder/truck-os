import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import { gql } from 'apollo-server-express';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  AccountArgType,
  AccountBulkArgType,
  AccountCreateDto,
  AccountFileCreateDto,
  AccountFilesBulkArgType,
  AccountSubmitDto,
  AccountUpdateDto,
  AccountUserArgType,
  DebtorArgType,
  OrderArgType,
} from 'src/factoring/dtos';
import { AccountFilesEntity, AccountUserEntity, DebtorEntity, OrderEntity } from 'src/factoring/entities';
import {
  AccountFilesFindQueryInterface,
  AccountUserFindQueryInterface,
  DebtorFindQueryInterface,
  OrderFindQueryInterface,
} from 'src/factoring/interfaces';
import {
  AccountAccountUserLoader,
  AccountDebtorLoader,
  AccountFileLoader,
  AccountOrderLoader,
} from 'src/factoring/loaders';
import {
  mapAccountLegalStructureToModel,
  mapAccountRegisterCourtsToModel,
  mapAccountToModel,
  mapAccountUserToModel,
  mapDebtorToModel,
  mapOrderToModel,
} from 'src/factoring/mappers';
import {
  AccountFileModel,
  AccountLegalStructureModel,
  AccountModel,
  AccountPageModel,
  AccountRegisterCourtModel,
  AccountUserPageModel,
  DebtorPageModel,
  OrderPageModel,
  PaymentDetailsModel,
} from 'src/factoring/models';
import { PaymentDetailsInterface } from 'src/factoring/providers/interfaces';
import { AccountRepository } from 'src/factoring/repositories';
import { AccountService } from 'src/factoring/services';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';
import { FileStatusEnum } from 'src/platformClient/platformSpaceClient/enums';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { PlatformClientService } from 'src/platformClient/services';
import { UserEntity } from 'src/user/entities';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
    private readonly utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
    private readonly platformClientService: PlatformClientService,
  ) {}

  @Query(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async account(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountEntity = await this.accountService.findById(id, {
      fields,
    });

    if (!accountEntity) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return mapAccountToModel(accountEntity);
  }
  @Query(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async getAccountByUser(
    @Args({ name: 'userId', type: () => ID }, ParseUUIDStringPipe) userId: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountEntity = await this.accountService.find({
      filter: { userId: { equalTo: userId } },
      fields,
    });

    if (!accountEntity) {
      throw new NotFoundException(`Account with user id ${userId} not found`);
    }

    return mapAccountToModel(accountEntity[0]);
  }

  @Query(() => AccountPageModel)
  @UseGuards(JwtAuthGuard)
  async accounts(
    @Args({ type: () => AccountArgType }) args: AccountArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [accountEntities, totalCount] = await this.accountService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: accountEntities.map((accountEntity) => mapAccountToModel(accountEntity)),
    };
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async registerCompany(
    @Args({ name: 'account', type: () => AccountSubmitDto })
    accountData: AccountSubmitDto,
    @CurrentUser() user: UserEntity,
  ): Promise<boolean> {
    return this.accountService.registerCompany(accountData, user);
  }

  @Mutation(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async createAccount(
    @Args({ name: 'account', type: () => AccountCreateDto })
    accountData: AccountCreateDto,
  ): Promise<AccountModel> {
    const accountEntity = await this.accountService.create(accountData);
    return mapAccountToModel(accountEntity);
  }

  @Mutation(() => AccountFileModel)
  @UseGuards(JwtAuthGuard)
  async saveAccountFile(
    @Args({
      name: 'data',
      type: () => AccountFileCreateDto,
    })
    data: AccountFileCreateDto,
  ): Promise<AccountFileModel> {
    const file = await this.accountService.createAccountFile({
      ...data,
    });
    return plainToClass(AccountFileModel, file);
  }

  @Mutation(() => AccountFileModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateAccountFileStatus(
    @Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) fileId: string,
    @Args({ name: 'status', type: () => FileStatusEnum }) status: FileStatusEnum,
  ): Promise<AccountFileModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation UpdateFileStatusMutation($fileId: ID!, $status: FileStatusEnum!) {
          updateFileStatus(fileId: $fileId, status: $status) {
            id
            status
            url
          }
        }
      `,
      variables: {
        fileId,
        status,
      },
    });

    return data.updateFileStatus;
  }

  @Mutation(() => AccountModel)
  @UseGuards(JwtAuthGuard)
  async updateAccount(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'account', type: () => AccountUpdateDto }) accountData: AccountUpdateDto,
  ): Promise<AccountModel> {
    const accountEntity = await this.accountService.update(id, accountData);
    return mapAccountToModel(accountEntity);
  }

  @Mutation(() => ID)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<string> {
    return this.accountService.deleteById(id);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteAccounts(@Args({ type: () => AccountBulkArgType }) args: AccountBulkArgType): Promise<string[]> {
    return this.accountService.deleteByIds(args);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteAccountFiles(
    @Args({ type: () => AccountFilesBulkArgType }) args: AccountFilesBulkArgType,
  ): Promise<string[]> {
    return this.accountService.deleteAccountFiles(args);
  }

  @Query(() => [AccountLegalStructureModel])
  async accountLegalStructures(
    @Args({ name: 'country', type: () => String }) country: string,
  ): Promise<AccountLegalStructureModel[]> {
    const accountLegalStructures = await this.accountService.accountLegalStructures(country);

    return accountLegalStructures.map((accountLegalStructure) =>
      mapAccountLegalStructureToModel(accountLegalStructure),
    );
  }

  @Query(() => [AccountRegisterCourtModel])
  async accountRegisterCourts(
    @Args({ name: 'country', type: () => String }) country: string,
  ): Promise<AccountRegisterCourtModel[]> {
    const accountRegisterCourts = await this.accountService.accountRegisterCourts(country);

    return accountRegisterCourts.map((accountRegisterCourt) => mapAccountRegisterCourtsToModel(accountRegisterCourt));
  }

  /**
   * One-to-Many Relation. An account has many accountUsers.
   */
  @ResolveField(() => AccountUserPageModel)
  async accountUsers(
    @Args({ type: () => AccountUserArgType }) args: AccountUserArgType,
    @Parent() accountModel: AccountModel,
    @Loader(AccountAccountUserLoader)
    accountAccountUserLoader: DataLoader<AccountUserFindQueryInterface, AccountUserEntity[]>,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountUserPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountUserEntities = await accountAccountUserLoader.load({
      ...args,
      fields,
      filter: { accountId: { equalTo: accountModel.id } },
    });
    return {
      totalCount: accountUserEntities.length,
      data: accountUserEntities.map((accountUser) => mapAccountUserToModel(accountUser)),
    };
  }
  /**
   * One-to-Many Relation. An account has many orders.
   */
  @ResolveField(() => OrderPageModel)
  async orders(
    @Args({ type: () => OrderArgType }) args: OrderArgType,
    @Parent() accountModel: AccountModel,
    @Loader(AccountOrderLoader) accountOrderLoader: DataLoader<OrderFindQueryInterface, OrderEntity[]>,

    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const orderEntities = await accountOrderLoader.load({
      ...args,
      fields,
      filter: { accountId: { equalTo: accountModel.id } },
    });
    return {
      totalCount: orderEntities.length,
      data: orderEntities.map((order) => mapOrderToModel(order)),
    };
  }
  /**
   * One-to-Many Relation. An account has many debtors.
   */
  @ResolveField(() => DebtorPageModel)
  async debtors(
    @Args({ type: () => DebtorArgType }) args: DebtorArgType,
    @Parent() accountModel: AccountModel,
    @Loader(AccountDebtorLoader) accountDebtorLoader: DataLoader<DebtorFindQueryInterface, DebtorEntity[]>,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorEntities = await accountDebtorLoader.load({
      ...args,
      fields,
      filter: { accountId: { equalTo: accountModel.id } },
    });
    return {
      totalCount: debtorEntities.length,
      data: debtorEntities.map((debtor) => mapDebtorToModel(debtor)),
    };
  }

  @ResolveField(() => [AccountFileModel])
  async accountFiles(
    @Parent() accountModel: AccountModel,
    @Loader(AccountFileLoader)
    accountFileLoader: DataLoader<AccountFilesFindQueryInterface, AccountFilesEntity[]>,
    @Info()
    info: GraphQLResolveInfo,
  ): Promise<AccountFileModel[]> {
    const fields = this.utilityService.getInfoFields(info);
    const accountFiles = await accountFileLoader.load({
      fields,
      filter: { accountId: { equalTo: accountModel.id } },
    });
    return accountFiles.map((file) => plainToClass(AccountFileModel, file));
  }

  @ResolveField('virtualDetails', () => PaymentDetailsModel)
  async virtualDetails(): Promise<PaymentDetailsInterface> {
    return this.accountService.getAccountVirtualDetails();
  }
}
