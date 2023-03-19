import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from 'src/auth/services';
import { applicationConfig } from 'src/config';
import { InvalidTokenException } from 'src/library/exception';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(applicationConfig.KEY)
      appConfig: ConfigType<typeof applicationConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, token: string): Promise<[UserEntity, string]> {
    const contextId = ContextIdFactory.getByRequest(request);
    // "AuthService" is a request-scoped provider
    const authService = await this.moduleRef.resolve(AuthService, contextId);

    const userLogin = await authService.getUserByRefreshToken(token);

    if (!userLogin || !userLogin.active) {
      throw new InvalidTokenException();
    }
    return [userLogin, token];
  }
}
