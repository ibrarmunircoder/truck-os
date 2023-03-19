import { UnauthorizedException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  details: string;
}

interface InvalidApiKeyExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Invalid api key';

export class InvalidApiKeyException extends UnauthorizedException {
  constructor(error?: InvalidApiKeyExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.INVALID_API_KEY, error), description);
  }
}
