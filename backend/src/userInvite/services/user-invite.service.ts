import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { print } from 'graphql/language/printer';
import { UserTokenTypeEnum } from 'src/auth/enums';
import { AuthService } from 'src/auth/services';
import { applicationConfig } from 'src/config';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import { getGqlOperationName } from 'src/logger/utilities';
import { PlatformNotificationClientService } from 'src/platformClient/platformNotificationClient/services';
import { NotificationCreateMutationArgs } from 'src/platformClient/platformNotificationClient/types';
import { clearUserRefreshTokensMutation } from 'src/platformClient/platformUserClient/graphql';
import { PlatformUserClientService } from 'src/platformClient/platformUserClient/services';
import { AcceptUserInviteDto } from 'src/userInvite/dtos';
import { CheckUserInviteTokenModel, UserInviteModel } from 'src/userInvite/models';

@Injectable()
export class UserInviteService {
  constructor(
    private readonly platformUserClientService: PlatformUserClientService,
    private platformNotificationClientService: PlatformNotificationClientService,
    private readonly authService: AuthService,
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
    private readonly logger: Logger,
  ) {}

  async checkUserInviteToken(token: string): Promise<CheckUserInviteTokenModel> {
    return this.platformUserClientService.checkUserInviteToken(token);
  }

  async acceptUserInvite(acceptInvite: AcceptUserInviteDto): Promise<UserInviteModel> {
    const { password, token, locale, timezone } = acceptInvite;

    const acceptedInvite = await this.platformUserClientService.acceptUserInvite({ acceptUserInvite: { token } });
    const { email, firstName, lastName } = acceptedInvite;
    const user = await this.authService.register(
      {
        firstName,
        lastName,
        locale,
        email,
        password,
        timezone,
      },
      { emailConfirmed: true, optedIn: true },
    );
    await this.platformUserClientService.updateUserInvite(
      { id:acceptedInvite.id, userInvite:{ acceptedByUserId: user.roqIdentifier } });
    const notificationData: NotificationCreateMutationArgs = {
      key: 'user-info',
      entities: [{ uuid: user.roqIdentifier, type: 'user' }],
      recipients: {
        allUsers: true,
        excludedUserIds: [user.roqIdentifier],
      },
    };
    await this.platformNotificationClientService.createNotification(notificationData);
    return acceptedInvite;
  }

  public async clearUserRefreshTokens(userId: string): Promise<void> {
    const variables = {
      userId,
      type: UserTokenTypeEnum.REFRESH,
    };

    const loggingRequest = {
      graphql: print(clearUserRefreshTokensMutation),
      variables,
      operationName: getGqlOperationName(clearUserRefreshTokensMutation),
    };
    this.logger.log({
      type: LoggingTypeEnum.outgoingMutation,
      request: loggingRequest,
    });

    await this.platformUserClientService.clearUserRefreshTokens(userId);
  }
}
