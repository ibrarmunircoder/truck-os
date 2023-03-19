import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import * as bcrypt from 'bcrypt';
import { ClsService } from 'nestjs-cls';
import {
  AccountActivateDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ProviderDisconnectDto,
  ProviderLoginDto,
  RegisterDto,
  ResendEmailDto,
  RestorePasswordDto,
} from 'src/auth/dtos';
import { LoginProviderEnum, UserTokenTypeEnum } from 'src/auth/enums';
import { AuthRegisterOptionsInterface } from 'src/auth/interfaces';
import { CheckUserRestorePasswordTokenModel, SessionModel } from 'src/auth/models';
import { LoginMetaType } from 'src/auth/types';
import {
  applicationConfig,
  confirmEmailTemplates,
  resetPasswordEmailTemplates,
  welcomeEmailTemplates,
} from 'src/config';
import { EventTriggerService } from 'src/event/services';
import {
  UserEmailAlreadyExistsException,
  UserEmailNotProvidedException,
  UserIncorrectEmailPasswordException,
  UserInvalidCurrentPasswordException,
  UserInvalidTokenException,
  UserNotConfirmedException,
} from 'src/library/exception';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import { PlatformMailClientService } from 'src/platformClient/platformMailClient/services';
import { PlatformUserClientService } from 'src/platformClient/platformUserClient/services';
import { UserProviderType, UserTokenResponseType } from 'src/platformClient/platformUserClient/types';
import { PlatformHttpClientService } from 'src/platformClient/services';
import { UserEntity } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';
import { UserLoginHistoryService } from 'src/user/services';
import { UserInternalService } from 'src/userInternal/services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
    private readonly jwtService: JwtService,
    private readonly userInternalService: UserInternalService,
    private readonly userLoginHistoryService: UserLoginHistoryService,
    private readonly platformHttpClientService: PlatformHttpClientService,
    private readonly platformUserClientService: PlatformUserClientService,
    private platformMailClientService: PlatformMailClientService,
    private readonly logger: Logger,
    private readonly cls: ClsService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly eventTriggerService: EventTriggerService,
    @InjectSendGrid() private readonly sendGridClient: SendGridService,
  ) {}

  get registerOptions(): AuthRegisterOptionsInterface {
    const autoConfirm = this.appConfig.autoEmailConfirmation;
    return { emailConfirmed: autoConfirm, optedIn: autoConfirm };
  }
  async register(
    registerDto: RegisterDto,
    options: AuthRegisterOptionsInterface = this.registerOptions,
  ): Promise<UserEntity> {
    const { firstName, lastName, email, password, timezone, locale } = registerDto;

    const userExists = await this.userRepository.findOne({ email });
    if (userExists) {
      throw new UserEmailAlreadyExistsException();
    }

    const { emailConfirmed, optedIn } = options;

    const user = await this.userInternalService.create({
      firstName,
      lastName,
      email,
      password: await this.hashPassword(password),
      optedInAt: optedIn ? new Date() : null,
      timezone,
      locale,
    });
    if (emailConfirmed) {
      await this.accountActivationEvents(user);
    } else {
      await this.sendConfirmationEmail(user);
    }
    return user;
  }

  async resendEmail(resendEmailDto: ResendEmailDto): Promise<boolean> {
    const { email } = resendEmailDto;
    const user = await this.userRepository.findOne({ email, optedInAt: null });
    if (user) {
      await this.sendConfirmationEmail(user);
    }
    return true;
  }

  private async sendConfirmationEmail(user: UserEntity): Promise<void> {
    const confirmMailToken = await this.platformUserClientService.createUserValidateEmailToken({
      userToken: { userId: user.roqIdentifier },
    });
    const { email, locale, firstName, lastName } = user;
    const confirmMailPayload = {
      to: email,
      from: 'noreply@truck-os.de',
      templateId: confirmEmailTemplates[locale],
      dynamicTemplateData: {
        user: {
          firstName,
          lastName,
        },
        token: confirmMailToken.token,
        baseUrl: this.appConfig.baseUrl,
      },
    };
    await this.sendGridClient.send(confirmMailPayload);
  }

  async login(credentials: LoginDto, meta: LoginMetaType): Promise<SessionModel> {
    const user = await this.userRepository
      .buildSelectQuery({ filter: { email: { equalTo: credentials.email } } })
      .getOne();

    if (!user) {
      this.logger.log({
        type: LoggingTypeEnum.system,
        message: `No user with [${credentials.email}]`,
      });
      throw new UserIncorrectEmailPasswordException();
    }

    const valid = await this.comparePassword(credentials.password, user.password);
    const isConfirmed = user.optedInAt;
    const { active: isActive } = user || {};

    if (!user || !valid || !isConfirmed || !isActive) {
      this.logger.log({
        type: LoggingTypeEnum.system,
        message: `User [${credentials.email}] valid: [${valid}] confirmed [${isConfirmed}] active [${isActive}]`,
      });
      throw new UserIncorrectEmailPasswordException();
    }

    return this.processLogin(user, meta, credentials?.keepMeLoggedIn);
  }

  async accountActivate(accountActivateDto: AccountActivateDto, meta: LoginMetaType): Promise<SessionModel> {
    const { token } = accountActivateDto;
    const userTokensResponse = await this.platformUserClientService.getUserTokens({
      filter: {
        token: { equalTo: token },
        type: { equalTo: 'validateEmail' },
      },
    });

    if (!userTokensResponse?.data?.length) {
      throw new UserInvalidTokenException();
    }
    const [userToken] = userTokensResponse.data;
    const user = await this.userRepository.findOne({ roqIdentifier: userToken.userId });

    if (!user.active) {
      throw new UserInvalidTokenException();
    }

    await this.userInternalService.update(user.id, { optedInAt: new Date() });

    await this.platformUserClientService.deleteUserToken(userToken.userId);

    await this.accountActivationEvents(user);
    return this.processLogin(user, meta);
  }

  private async accountActivationEvents(user: UserEntity) {
    const { email, locale, firstName, lastName } = user;
    const welcomeMailPayload = {
      to: email,
      from: 'noreply@truck-os.de',
      templateId: welcomeEmailTemplates[locale],
      dynamicTemplateData: {
        user: {
          firstName,
          lastName,
        },
      },
    };
    await this.sendGridClient.send(welcomeMailPayload);
  }

  private async processLogin(user: UserEntity, meta?: LoginMetaType, keepLoggedIn?: boolean): Promise<SessionModel> {
    const refreshToken = await this.createRefreshToken(user, keepLoggedIn);
    const accessToken = await this.createAccessToken(user);

    if (meta) {
      await this.userLoginHistoryService.create({
        userId: user.id,
        ip: meta.ip,
        host: meta.host,
        timestamp: new Date(),
      });
    }

    const platformAccessToken = await this.platformHttpClientService.getAccessToken(user.roqIdentifier);

    return {
      accessToken,
      refreshToken,
      platformAccessToken,
      userId: user.id,
    };
  }

  async createRefreshToken(user: UserEntity, keepLoggedIn?: boolean): Promise<string> {
    const refreshToken = await this.platformUserClientService.createUserRefreshToken({
      userToken: { userId: user.roqIdentifier, keepLoggedIn },
    });

    return refreshToken.token;
  }

  createAccessToken(user: UserEntity): Promise<string> {
    const { expiresIn, secret } = this.appConfig.jwt.access;
    const options: JwtSignOptions = { expiresIn, secret };
    const payload = { id: user.id, roqIdentifier: user.roqIdentifier };
    return this.jwtService.signAsync(payload, options);
  }

  async getUserByRefreshToken(token: string): Promise<UserEntity | null> {
    const refreshToken = await this.platformUserClientService.verifyUserRefreshToken({
      userToken: { token },
    });
    if (refreshToken) {
      return this.userRepository.findOne({ roqIdentifier: refreshToken.userId });
    }
    return null;
  }

  async getUserByAuthToken(token: string): Promise<UserEntity> {
    const { secret } = this.appConfig.jwt.access;
    const options: JwtVerifyOptions = { secret };
    const payload = this.jwtService.verify(token, options);
    let user: UserEntity;
    if (payload) {
      user = await this.userRepository.findOne(payload.id);
    }
    return user;
  }

  async deleteRefreshTokensByUserId(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne(userId);
    await this.platformUserClientService.clearUserRefreshTokens(user.roqIdentifier);
    return true;
  }

  async refreshTokens(user: UserEntity, token: string): Promise<SessionModel> {
    const refreshToken = await this.rotateRefreshToken(token);
    const accessToken = await this.createAccessToken(user);

    return {
      accessToken,
      refreshToken,
      userId: user.id,
    };
  }

  async rotateRefreshToken(token: string): Promise<string> {
    const refreshToken = await this.platformUserClientService.rotateRefreshToken(token);

    return refreshToken.token;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<boolean> {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ email });
    if (user?.active) {
      const resetPasswordToken = await this.platformUserClientService.createUserResetPasswordToken({
        userToken: { userId: user.roqIdentifier },
      });
      return this.sendForgotPasswordMail(email, resetPasswordToken);
    }
    return true;
  }

  async sendForgotPasswordMail(email: string, token?: UserTokenResponseType): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    if (!user?.active) {
      return false;
    }
    const resetPasswordTokens = await this.platformUserClientService.getUserTokens({
      filter: {
        userId: { equalTo: user.roqIdentifier },
        type: { equalTo: 'resetPassword' },
      },
      order: {
        order: 'DESC',
        sort: 'createdAt',
      },
    });
    if (resetPasswordTokens.data?.length < 1) {
      return false;
    }
    const [resetPasswordToken] = resetPasswordTokens.data || [token];
    const resetPasswordMailPayload = {
      to: email,
      from: 'noreply@truck-os.de',
      templateId: resetPasswordEmailTemplates[user.locale],
      dynamicTemplateData: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        token: resetPasswordToken?.token,
        baseUrl: this.appConfig.baseUrl,
      },
    };
    await this.sendGridClient.send(resetPasswordMailPayload);
    return true;
  }

  async checkUserRestorePasswordToken(token: string): Promise<CheckUserRestorePasswordTokenModel> {
    const result = await this.platformUserClientService.checkUserRestorePasswordToken(
      token,
      UserTokenTypeEnum.RESET_PASSWORD,
    );

    const user = await this.userRepository.findOne({ email: result.email });

    if (!user?.active) {
      throw new UserInvalidTokenException();
    }

    return result;
  }

  async restorePassword(restorePasswordDto: RestorePasswordDto, meta: LoginMetaType): Promise<SessionModel> {
    const { password, token } = restorePasswordDto;
    const userTokensResponse = await this.platformUserClientService.getResetPasswordTokens(token);
    if (!userTokensResponse?.data?.length) {
      throw new UserInvalidTokenException();
    }
    const [userToken] = userTokensResponse.data;
    const user = await this.userRepository.findOne({ roqIdentifier: userToken.userId });

    if (!user.active) {
      throw new UserInvalidTokenException();
    }

    await this.userRepository.save({
      id: user.id,
      password: await this.hashPassword(password),
    });
    await this.platformUserClientService.deleteUserToken(userToken.userId);
    return this.processLogin(user, meta);
  }

  public comparePassword(attempt: string, password: string): Promise<boolean> {
    return bcrypt.compare(attempt, password);
  }

  public hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async changePassword(user: UserEntity, { password, newPassword }: ChangePasswordDto): Promise<boolean> {
    const valid = user && (await this.comparePassword(password, user.password));

    if (!valid) {
      throw new UserInvalidCurrentPasswordException();
    }

    await this.userRepository.save({
      id: user.id,
      password: await this.hashPassword(newPassword),
    });

    return true;
  }

  private async createUserProvider(providerId: LoginProviderEnum, providerUserId: string, user: UserEntity) {
    const variables = {
      userProvider: {
        providerIdentifier: providerId,
        providerUserIdentifier: providerUserId,
        userId: user.roqIdentifier,
        optedIn: true, // @todo: probably still need email confirmation in a case when userOld was already existing?
      },
    };

    await this.platformUserClientService.createUserProvider(variables);
  }

  private async fetchUserProviderResponse(
    providerId: LoginProviderEnum,
    providerUserId: string,
  ): Promise<{ data: UserProviderType[] }> {
    return this.platformUserClientService.getUserProvider(providerId, providerUserId);
  }

  /**
   * Performs user authentication with provider. Creates/updates user and/or user-provider connection if necessary.
   */
  async providerLogin(providerLoginDto: ProviderLoginDto, meta: LoginMetaType): Promise<SessionModel> {
    const { email, providerId, providerUserId, firstName, lastName, locale } = providerLoginDto;
    const userProvidersResponse = await this.fetchUserProviderResponse(providerId, providerUserId);

    let user: UserEntity;
    let userProvider;

    if (userProvidersResponse.data.length > 0) {
      userProvider = userProvidersResponse.data[0];
      if (!userProvider.optedIn) {
        throw new UserNotConfirmedException();
      }
      user = await this.userRepository.findOne({ roqIdentifier: userProvider.userId });
    }

    if (!user) {
      if (!email) {
        throw new UserEmailNotProvidedException();
      }
      user = await this.userRepository.findOne({ email });
    }

    if (user && !user.optedInAt) {
      await this.userInternalService.update(user.id, { optedInAt: new Date() });
    }

    if (user && !user.active) {
      throw new UserInvalidTokenException();
    }

    let updateData = {};
    if (user) {
      updateData = {
        ...(!user.firstName && firstName && { firstName }),
        ...(!user.lastName && lastName && { lastName }),
        ...(user.locale !== locale && { locale }),
      };
    }

    if (Object.keys(updateData).length > 0) {
      user = await this.userInternalService.update(user.id, updateData);
    }

    if (!user) {
      user = await this.userInternalService.create({
        firstName,
        lastName,
        email,
        password: await this.hashPassword(Math.random().toString(36).substring(2)),
        optedInAt: new Date(),
        locale,
      });
    }

    if (!userProvider) {
      await this.createUserProvider(providerId, providerUserId, user);
    }
    return this.processLogin(user, meta);
  }

  async providerDisconnect(user: UserEntity, { providerId }: ProviderDisconnectDto): Promise<boolean> {
    const variables = {
      filter: {
        providerIdentifier: {
          equalTo: providerId,
        },
        userId: {
          equalTo: user.roqIdentifier,
        },
      },
    };

    await this.platformUserClientService.deleteUserProviders(variables);

    return true;
  }

  async getPlatformAccessToken(roqIdentifier: string): Promise<string> {
    return this.platformHttpClientService.getAccessToken(roqIdentifier);
  }
}
