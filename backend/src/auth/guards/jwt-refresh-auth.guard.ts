import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';
import { UnauthorizedException } from 'src/library/exception';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  getRequest(context: ExecutionContext): AuthenticatedRequestInterface {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<User = UserEntity>(err: Error, user: UserEntity): User {
    if (err || !user) {
      throw new UnauthorizedException({ variables: { message: err?.message } });
    }
    return user as unknown as User;
  }
}
