import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadType } from 'src/auth/types';
import { applicationConfig } from 'src/config';
import { UserEntity } from 'src/user/entities';
import { UserService } from 'src/user/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(applicationConfig.KEY)
    appConfig: ConfigType<typeof applicationConfig>,
    private moduleRef: ModuleRef,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwt.access.secret,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: JwtPayloadType,
  ): Promise<UserEntity> {
    const contextId = ContextIdFactory.getByRequest(request);
    // "UserService" is a request-scoped provider
    const userService = await this.moduleRef.resolve(UserService, contextId, { strict: false });
    const user = await userService.findById(payload.id, {});
    if (!user || !user.active) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
