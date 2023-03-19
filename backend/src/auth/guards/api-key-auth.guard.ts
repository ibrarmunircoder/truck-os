import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequestInterface } from 'src/auth/interfaces';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard('headerapikey') {
  getRequest(context: ExecutionContext): AuthenticatedRequestInterface {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
