import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';
import { UnauthorizedException } from 'src/library/exception';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
    if (err || !user) {
      throw err || new UnauthorizedException({ variables: { message: info } });
    }
    return (user as unknown) as User;
  }
}
