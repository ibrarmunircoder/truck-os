import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class IsSuperUserGuard extends AuthGuard('jwt') {
  constructor(protected configService: ConfigService) {
    super();
  }

  getRequest(context: ExecutionContext): AuthenticatedRequestInterface {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<User = UserEntity>(
    err: string | Record<string, unknown>,
    user: UserEntity,
    info: string | Record<string, unknown> | unknown,
  ): User {
    const supersUsers = this.configService.get('application.superUsers');
    if (err || !user || !supersUsers.includes(user.email)) {
      throw err || new UnauthorizedException(info);
    }
    return (user as unknown) as User;
  }
}
