import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  AccountUserArgType,
  AccountUserBulkArgType,
  AccountUserCreateDto,
  AccountUserUpdateDto,
} from 'src/factoring/dtos';
import { AccountEntity } from 'src/factoring/entities';
import { AccountFindQueryInterface } from 'src/factoring/interfaces';
import { AccountLoader } from 'src/factoring/loaders';
import { mapAccountToModel, mapAccountUserToModel } from 'src/factoring/mappers';
import { AccountModel, AccountUserModel, AccountUserPageModel } from 'src/factoring/models';
import { AccountUserRepository } from 'src/factoring/repositories';
import { AccountUserService } from 'src/factoring/services';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';

@Resolver(() => AccountUserModel)
export class AccountUserResolver {
  constructor(
    @InjectRepository(AccountUserRepository)
    private readonly accountUserRepository: AccountUserRepository,
    private readonly accountUserService: AccountUserService,
    private readonly utilityService: UtilityService,
  ) {}

  @Query(() => AccountUserModel)
  @UseGuards(JwtAuthGuard)
  async accountUser(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountUserModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountUserEntity = await this.accountUserService.findById(id, {
      fields,
    });

    if (!accountUserEntity) {
      throw new NotFoundException(`AccountUser with id ${id} not found`);
    }

    return mapAccountUserToModel(accountUserEntity);
  }

  @Query(() => AccountUserPageModel)
  @UseGuards(JwtAuthGuard)
  async accountUsers(
    @Args({ type: () => AccountUserArgType }) args: AccountUserArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountUserPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [accountUserEntities, totalCount] = await this.accountUserService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: accountUserEntities.map((accountUserEntity) => mapAccountUserToModel(accountUserEntity)),
    };
  }

  @Mutation(() => AccountUserModel)
  @UseGuards(JwtAuthGuard)
  async createAccountUser(
    @Args({ name: 'accountUser', type: () => AccountUserCreateDto })
    accountUserData: AccountUserCreateDto,
  ): Promise<AccountUserModel> {
    const accountUserEntity = await this.accountUserService.create(accountUserData);
    return mapAccountUserToModel(accountUserEntity);
  }

  @Mutation(() => AccountUserModel)
  @UseGuards(JwtAuthGuard)
  async updateAccountUser(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'accountUser', type: () => AccountUserUpdateDto }) accountUserData: AccountUserUpdateDto,
  ): Promise<AccountUserModel> {
    const accountUserEntity = await this.accountUserService.update(id, accountUserData);
    return mapAccountUserToModel(accountUserEntity);
  }

  @Mutation(() => ID)
  @UseGuards(JwtAuthGuard)
  async deleteAccountUser(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<string> {
    return this.accountUserService.deleteById(id);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteAccountUsers(
    @Args({ type: () => AccountUserBulkArgType }) args: AccountUserBulkArgType,
  ): Promise<string[]> {
    return this.accountUserService.deleteByIds(args);
  }

  /**
   * Many-to-One Relation. There is accountUser  in one account.
   */
  @ResolveField(() => AccountModel)
  async account(
    @Parent() accountUserModel: AccountUserModel,
    @Loader(AccountLoader) accountLoader: DataLoader<AccountFindQueryInterface, AccountEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountEntity = await accountLoader.load({ filter: { id: { equalTo: accountUserModel.accountId } }, fields });
    return mapAccountToModel(accountEntity);
  }
}
