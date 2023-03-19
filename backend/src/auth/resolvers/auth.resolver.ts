import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, LoginMeta, RefreshToken } from 'src/auth/decorators';
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
import { ApiKeyAuthGuard, JwtAuthGuard, JwtRefreshAuthGuard } from 'src/auth/guards';
import { AccessTokenModel, CheckUserRestorePasswordTokenModel, RegisterUserModel, SessionModel } from 'src/auth/models';
import { AuthService } from 'src/auth/services';
import { LoginMetaType } from 'src/auth/types';
import { AccountService } from 'src/factoring/services';
import { UserEntity } from 'src/user/entities';

@Resolver(() => String)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly accountService: AccountService) {}

  @Mutation(() => RegisterUserModel, { description: 'Performs user registration' })
  async register(@Args('input') input: RegisterDto): Promise<RegisterUserModel> {
    const user = await this.authService.register(input);
    await this.accountService.create({
      userId: user.id,
    });
    return { status: true, message: 'An email was sent to your email address' };
  }

  @Mutation(() => SessionModel, { description: 'Activates userOld account with matching activation token' })
  async accountActivate(
    @Args('input') input: AccountActivateDto,
    @LoginMeta() meta: LoginMetaType,
  ): Promise<SessionModel> {
    return this.authService.accountActivate(input, meta);
  }

  @Mutation(() => SessionModel, { description: 'Performs user login with email and password' })
  async login(@Args('input') input: LoginDto, @LoginMeta() meta: LoginMetaType): Promise<SessionModel> {
    return this.authService.login(input, meta);
  }

  @Mutation(() => SessionModel, {
    description: 'Performs regeneration of access token for user identified by refresh token',
  })
  @UseGuards(JwtRefreshAuthGuard)
  async refreshTokens(@CurrentUser() userLogin: UserEntity, @RefreshToken() token: string): Promise<SessionModel> {
    return this.authService.refreshTokens(userLogin, token);
  }

  @Mutation(() => Boolean, { description: 'Removes refresh token for current user from database' })
  @UseGuards(JwtRefreshAuthGuard)
  async deleteRefreshTokens(@CurrentUser() user: UserEntity): Promise<boolean> {
    return !!(await this.authService.deleteRefreshTokensByUserId(user.id));
  }

  @Mutation(() => Boolean, { description: 'Logs out current user' })
  @UseGuards(JwtRefreshAuthGuard)
  async logout(@CurrentUser() user: UserEntity): Promise<boolean> {
    return !!(await this.authService.deleteRefreshTokensByUserId(user.id));
  }

  @Mutation(() => Boolean, { description: 'Requests email link to restore password' })
  async forgotPassword(@Args('input') input: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(input);
  }

  @Mutation(() => SessionModel, { description: 'Set password for userOld with specified restore password token' })
  async restorePassword(
    @Args('input') input: RestorePasswordDto,
    @LoginMeta() meta: LoginMetaType,
  ): Promise<SessionModel> {
    return this.authService.restorePassword(input, meta);
  }

  @Mutation(() => Boolean, { description: 'Change password for current user' })
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @CurrentUser() userLogin: UserEntity,
    @Args('input') input: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(userLogin, input);
  }

  @Query(() => CheckUserRestorePasswordTokenModel)
  async checkUserRestorePasswordToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<CheckUserRestorePasswordTokenModel> {
    return this.authService.checkUserRestorePasswordToken(token);
  }

  /**
   * Performs user authentication (and registration, when necessary) with provider.
   * This mutation is protected with security key  and it is assumed that it is used only
   * from server side (next backend) which receives callback from OAuth provider.
   */
  @Mutation(() => SessionModel, {
    description:
      'Performs user authentication (including creation of application user) with provider. Protected by API key and should be used only from server side.',
  })
  @UseGuards(ApiKeyAuthGuard)
  async providerLogin(@Args('input') input: ProviderLoginDto, @LoginMeta() meta: LoginMetaType): Promise<SessionModel> {
    return this.authService.providerLogin(input, meta);
  }

  @Mutation(() => Boolean, { description: 'Disconnects provider from currently logged in user.' })
  @UseGuards(JwtAuthGuard)
  async providerDisconnect(
    @CurrentUser() user: UserEntity,
    @Args('input') input: ProviderDisconnectDto,
  ): Promise<boolean> {
    return this.authService.providerDisconnect(user, input);
  }

  @Mutation(() => Boolean, { description: 'Performs resend Email' })
  async resendEmail(@Args('input') input: ResendEmailDto): Promise<boolean> {
    return this.authService.resendEmail(input);
  }

  @Mutation(() => AccessTokenModel)
  @UseGuards(JwtAuthGuard)
  async createPlatformToken(@CurrentUser() user: UserEntity): Promise<AccessTokenModel> {
    const accessToken = await this.authService.getPlatformAccessToken(user.roqIdentifier);

    return new AccessTokenModel({ accessToken });
  }
}
