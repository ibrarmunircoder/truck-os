import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { OrderEnum } from 'src/library/enums';
import { UserActivationException, UserNotFoundException } from 'src/library/exception';
import { GraphqlContextInterface } from 'src/library/interfaces';
import { UtilityService } from 'src/library/services';
import { PlatformNotificationClientService } from 'src/platformClient/platformNotificationClient/services';
import { NotificationCreateMutationArgs } from 'src/platformClient/platformNotificationClient/types';
import { FileOrderSortEnum, FileStatusEnum } from 'src/platformClient/platformSpaceClient/enums';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { FileResponseType } from 'src/platformClient/platformSpaceClient/types';
import { PlatformUserClientService } from 'src/platformClient/platformUserClient/services';
import { UserProviderType } from 'src/platformClient/platformUserClient/types';
import { UserUpdateDto } from 'src/user/dtos';
import { UserEntity } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import { USER_AVATAR_CATEGORY, USER_ENTITY_NAME } from 'src/userInternal/constants';
import { UserCreateInterface } from 'src/userInternal/interfaces';

@Injectable()
export class UserInternalService extends UserService {
  constructor(
    @InjectRepository(UserRepository)
    userRepository: UserRepository,
    private platformSpaceClientService: PlatformSpaceClientService,
    private platformNotificationClientService: PlatformNotificationClientService,
    private platformUserClientService: PlatformUserClientService,
    configService: ConfigService,
    utilityService: UtilityService,
    @Inject(CONTEXT) private context: GraphqlContextInterface,
  ) {
    super(userRepository, configService, utilityService);
  }

  public async create(user: UserCreateInterface): Promise<UserEntity> {
    const clonedUser = cloneDeep(user);
    const platformUser = await this.platformUserClientService.createUser({ user });
    return super.create({ ...clonedUser, roqIdentifier: platformUser.id, sync: true });
  }

  public async update(id: string, userInput: UserUpdateDto): Promise<UserEntity> {
    const { optedInAt, ...previousUserData } = userInput;
    const previousUserEntity = await this.userRepository.preload({ id, ...previousUserData });
    const savedUserEntity = await super.update(id, userInput);
    if (!previousUserEntity?.optedInAt && optedInAt) {
      const notificationData: NotificationCreateMutationArgs = {
        key: 'user-info',
        entities: [{ uuid: savedUserEntity.roqIdentifier, type: 'user' }],
        recipients: {
          allUsers: true,
          excludedUserIds: [savedUserEntity.roqIdentifier],
        },
      };
      await this.platformNotificationClientService.createNotification(notificationData);
    }
    return savedUserEntity;
  }

  public async getConnectedProviders(userId: string): Promise<UserProviderType[]> {
    const user = await super.findById(userId, {});
    const userProvidersResponse = await this.platformUserClientService.getUserProviders(user.roqIdentifier);

    return userProvidersResponse.data;
  }

  async getAvatars(entityIdentifiers: string[]): Promise<FileResponseType[]> {
    return this.platformSpaceClientService.getFiles({
      entityIdentifiers: { valueIn: entityIdentifiers },
      entityName: { equalTo: USER_ENTITY_NAME },
      fileCategory: { equalTo: USER_AVATAR_CATEGORY },
      status: { equalTo: FileStatusEnum.ready },
      order: { order: OrderEnum.DESC, sort: FileOrderSortEnum.updatedAt },
      limit: 1,
    });
  }

  public async activateById(id: string): Promise<UserEntity> {
    const userEntity = await this.findById(id);

    if (!userEntity) {
      throw new UserNotFoundException({ variables: { id } });
    } else if (userEntity.active) {
      throw new UserActivationException({ variables: { id, status: 'active' } });
    }

    userEntity.active = true;
    return this.userRepository.save(userEntity);
  }

  public async deactivateById(id: string): Promise<UserEntity> {
    const userEntity = await this.findById(id);

    if (!userEntity) {
      throw new UserNotFoundException({ variables: { id } });
    } else if (!userEntity.active) {
      throw new UserActivationException({ variables: { id, status: 'deactivated' } });
    }

    userEntity.active = false;
    return this.userRepository.save(userEntity);
  }
}
