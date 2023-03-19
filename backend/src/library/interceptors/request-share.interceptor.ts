import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { ClsKeyEnum } from 'src/library/enums';
import { applicationConfig } from 'src/config';
import { v4 } from 'uuid';
import { UserService } from 'src/user/services';

@Injectable()
export class RequestShareInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService, private configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService, @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>) {}

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (req) {
      const requestIdHeader = this.configService.get('application.platform.requestIdHeader');
      const requestCallerHeader = this.configService.get('application.platform.requestCallerHeader');
      const authorizationHeader = this.configService.get('application.platform.authorizationHeader');

      const requestId = req.headers?.[requestIdHeader] ?? v4();
      const requestCaller = req.headers?.[requestCallerHeader];
      const authorization = req.headers?.[authorizationHeader];

      const parseBearer = (bearer: string) => {
        const [_, token] = bearer.trim().split(" ");
        return token;
      };
      const token = req.headers?.authorization;
      if (token) {
        const authToken = parseBearer(token);
        const { secret } = this.appConfig.jwt.access;
        const options: JwtVerifyOptions = { secret };
        const payload = this.jwtService.verify(authToken, options);
        const user = await this.userService.findById(payload.id, {});
        this.cls.set(ClsKeyEnum.USER_ID, payload.id);
        if (user) {
          this.cls.set(ClsKeyEnum.API_KEY, user.apiKey);
        }
      }
      this.cls.set(ClsKeyEnum.REQUEST_ID, requestId);
      if (authorization) {
        this.cls.set(ClsKeyEnum.USER_TOKEN, authorization);
      }
      if (requestCaller) {
        this.cls.set(ClsKeyEnum.REQUEST_CALLER, requestCaller);
      }
    }

    return next.handle();
  }
}
