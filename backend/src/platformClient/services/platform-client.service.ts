import { MutationOptions, QueryOptions } from '@apollo/client/core';
import { ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { print } from 'graphql/language/printer';
import { ClsService } from 'nestjs-cls';
import { ApolloClientService } from 'src/apolloClient/services';
import { ApolloClientConfigType } from 'src/apolloClient/types';
import { ClsKeyEnum, ErrorCodeEnum } from 'src/library/enums';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import { getGqlOperationName } from 'src/logger/utilities';
import { v4 } from 'uuid';

import { ExceptionMappingType, GraphqlExceptionType } from '../types';

@Injectable()
export class PlatformClientService extends ApolloClientService {
  private static exceptionMapping: ExceptionMappingType = {
    [ErrorCodeEnum.FORBIDDEN]: ForbiddenException,
    [ErrorCodeEnum.UNAUTHORIZED_EXCEPTION]: UnauthorizedException,
  };

  constructor(
    protected config: ApolloClientConfigType,
    protected configService: ConfigService,
    protected logger: Logger,
    protected readonly cls: ClsService,
  ) {
    super(config, configService);
  }

  static parseException(
    e: GraphqlExceptionType | HttpException,
    exceptionMapping = PlatformClientService.exceptionMapping): HttpException {
    const error = (e as GraphqlExceptionType)?.graphQLErrors?.[0] || e as GraphqlExceptionType;
    if (!error?.extensions) {
      return e as HttpException;
    }
    const { response } = error.extensions;
    const { errorCode } = response;
    const ExceptionClass = exceptionMapping[errorCode];
    if (!ExceptionClass) {
      throw e;
    }
    return new ExceptionClass(response as never);
  }

  protected async setHeaders(headers: Record<string, unknown> = {}): Promise<void> {
    const requestId = this.cls.get(ClsKeyEnum.REQUEST_ID) ?? v4();
    const userToken = this.cls.get(ClsKeyEnum.USER_TOKEN);
    const requestCaller = this.configService.get('application.appName');

    headers[this.configService.get('application.platform.requestIdHeader')] = requestId;
    headers[this.configService.get('application.platform.requestCallerHeader')] = requestCaller;
    if (userToken) {
      headers[this.configService.get('application.platform.authorizationHeader')] = userToken;
    }
  }

  async request<T>(
    request: QueryOptions | MutationOptions,
    responseKey?: string,
    headers: Record<string, unknown> = {},
  ): Promise<T> {
    await this.setHeaders(headers);

    let requestLogType;
    let responseLogType;
    let errorResponseLogType;
    const isMutation = 'mutation' in request;
    if (isMutation) {
      requestLogType = LoggingTypeEnum.outgoingMutation;
      responseLogType = LoggingTypeEnum.outgoingMutationResponse;
      errorResponseLogType = LoggingTypeEnum.outgoingMutationError;
    } else {
      requestLogType = LoggingTypeEnum.outgoingQuery;
      responseLogType = LoggingTypeEnum.outgoingQueryResponse;
      errorResponseLogType = LoggingTypeEnum.outgoingQueryError;
    }

    const operationName = getGqlOperationName(isMutation ? request.mutation : request.query);

    const loggingRequest = {
      graphql: print(isMutation ? request.mutation : request.query),
      variables: request.variables,
      operationName,
      url: this.uri,
      headers,
    };

    try {
      this.logger.log({
        type: requestLogType,
        request: loggingRequest,
      });
      const response = await super.request<T>(request, responseKey, headers);
      this.logger.log({
        request: loggingRequest,
        response: {
          data: response,
        },
        type: responseLogType,
      });
      return response;
    } catch (error) {
      this.logger.error({
        request: loggingRequest,
        response: {
          data: error,
        },
        type: errorResponseLogType,
      });
      throw PlatformClientService.parseException(error);
    }
  }
}
