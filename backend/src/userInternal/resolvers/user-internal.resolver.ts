import { UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { CurrentUser } from 'src/auth/decorators';
import { IsSuperUserGuard, JwtAuthGuard } from 'src/auth/guards';
import { mapAccountToModel } from 'src/factoring/mappers';
import { AccountModel } from 'src/factoring/models';
import { AccountService } from 'src/factoring/services';
import { UserNotFoundException } from 'src/library/exception';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { UserArgType, UserLoginHistoryArgType, UserUpdateDto } from 'src/user/dtos';
import { UserEntity, UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { UserUserLoginHistoryLoader } from 'src/user/loaders';
import { mapUserLoginHistoryToModel, mapUserToModel } from 'src/user/mappers';
import { UserLoginHistoryModel, UserLoginHistoryPageModel, UserModel, UserPageModel } from 'src/user/models';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import { USER_AVATAR_CATEGORY, USER_FILE_CATEGORY } from 'src/userInternal/constants';
import { UserFileCreateDto } from 'src/userInternal/dtos';
import { AvatarFindQueryInterface } from 'src/userInternal/interfaces';
import { UserInternalAvatarLoader, UserInternalLastLoginActivityLoader } from 'src/userInternal/loaders';
import { UserFileModel } from 'src/userInternal/models';
import { UserInternalService } from 'src/userInternal/services';
import { UserInviteService } from 'src/userInvite/services';

@Resolver(() => UserModel)
export class UserInternalResolver {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
    private readonly userInternalService: UserInternalService,
    private readonly userInviteService: UserInviteService,
    private readonly accountService: AccountService,
  ) {}

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async user(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<UserModel> {
    const fields = this.utilityService.getInfoFields(info);
    const userEntity = await this.userService.findById(id, {
      fields,
    });

    if (!userEntity) {
      throw new UserNotFoundException({ variables: { id } });
    }

    return mapUserToModel(userEntity);
  }

  @Query(() => UserPageModel)
  // @UseGuards(JwtAuthGuard)
  @UseGuards(IsSuperUserGuard)
  async users(
    @Args({ type: () => UserArgType }) args: UserArgType,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [userEntities, totalCount] = await this.userService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: userEntities.map((userEntity) => mapUserToModel(userEntity)),
    };
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'user', type: () => UserUpdateDto }) userData: UserUpdateDto,
  ): Promise<UserModel> {
    const userEntity = await this.userService.update(id, userData);
    return mapUserToModel(userEntity);
  }

  /**
   * One-to-Many Relation. An user has many userLoginHistories.
   */
  @ResolveField(() => UserModel)
  async userLoginHistories(
    @Args({ type: () => UserLoginHistoryArgType }) args: UserLoginHistoryArgType,
    @Parent() userModel: UserModel,
    @Loader(UserUserLoginHistoryLoader)
    userUserLoginHistoryLoader: DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity[]>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserLoginHistoryPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const userLoginHistoryEntities = await userUserLoginHistoryLoader.load({
      ...args,
      fields,
      filter: { userId: { equalTo: userModel.id } },
    });
    return {
      totalCount: userLoginHistoryEntities.length,
      data: userLoginHistoryEntities.map((userLoginHistory) => mapUserLoginHistoryToModel(userLoginHistory)),
    };
  }

  @ResolveField(() => UserLoginHistoryModel, { nullable: true })
  async lastLogin(
    @Parent() userModel: UserModel,
    @Loader(UserInternalLastLoginActivityLoader)
    lastLoginActivityLoader: DataLoader<UserLoginHistoryFindQueryInterface, UserLoginHistoryEntity>,
  ): Promise<UserLoginHistoryModel> {
    const lastUserLoginHistoryEntity = await lastLoginActivityLoader.load({
      filter: { userId: { equalTo: userModel.id } },
    });
    return mapUserLoginHistoryToModel(lastUserLoginHistoryEntity);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async whoAmI(@CurrentUser() user: UserEntity): Promise<UserModel> {
    const userEntity = await this.userService.findById(user.id, {});
    return mapUserToModel(userEntity);
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async isAccountVerified(@CurrentUser() user: UserEntity): Promise<boolean> {
    const userEntity = await this.userService.findById(user.id, {});
    return userEntity.apiKey !== null;
  }

  @Mutation(() => UserFileModel)
  @UseGuards(JwtAuthGuard)
  async updateUserAvatar(
    @Args({
      name: 'data',
      type: () => UserFileCreateDto,
    })
    data: UserFileCreateDto,
  ): Promise<UserFileModel> {
    return this.platformSpaceClientService.createFile({
      ...data,
      fileCategory: USER_AVATAR_CATEGORY,
    });
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async activateUser(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<UserModel> {
    const userEntity = await this.userInternalService.activateById(id);
    return mapUserToModel(userEntity);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async deactivateUser(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<UserModel> {
    const userEntity = await this.userInternalService.deactivateById(id);
    await this.userInviteService.clearUserRefreshTokens(userEntity.roqIdentifier);
    return mapUserToModel(userEntity);
  }

  @ResolveField(() => String, { nullable: true })
  async avatar(
    @Parent() userModel: UserModel,
    @Loader(UserInternalAvatarLoader)
    userInternalAvatarLoader: DataLoader<AvatarFindQueryInterface, UserFileModel>,
  ): Promise<string | null> {
    const avatarFile = await userInternalAvatarLoader.load({
      id: userModel.id,
      roqIdentifier: userModel.roqIdentifier,
    });
    return avatarFile?.url;
  }

  @Mutation(() => UserFileModel)
  @UseGuards(JwtAuthGuard)
  async saveUserFile(
    @Args({
      name: 'data',
      type: () => UserFileCreateDto,
    })
    data: UserFileCreateDto,
  ): Promise<UserFileModel> {
    const file = await this.platformSpaceClientService.createFile({
      ...data,
      fileCategory: USER_FILE_CATEGORY,
    });

    return plainToClass(UserFileModel, file);
  }

  @ResolveField(() => [String])
  async connectedProviderIds(@Parent() userModel: UserModel): Promise<string[]> {
    const connectedProviders = await this.userInternalService.getConnectedProviders(userModel.id);
    return connectedProviders.map(({ providerIdentifier }) => providerIdentifier);
  }

  @ResolveField(() => String)
  async fullName(@Parent() userModel: UserModel): Promise<string> {
    const { firstName, lastName } = userModel;
    return firstName && lastName ? `${firstName || ''} ${lastName || ''}` : 'N/A';
  }

  @ResolveField(() => String)
  async initials(@Parent() userModel: UserModel): Promise<string> {
    const firstLetter = userModel.firstName?.charAt(0) ?? '';
    const secondLeter = userModel.lastName?.charAt(0) ?? '';
    return `${firstLetter}${secondLeter}`.toUpperCase() || 'N/A';
  }

  @ResolveField(() => AccountModel, { nullable: true })
  async account(@Parent() userModel: UserModel): Promise<AccountModel> {
    const account = await this.accountService.find({ filter: { userId: { equalTo: userModel.id } } });
    if (account && account.length) {
      return mapAccountToModel(account[0]);
    }
    return null;
  }
}
