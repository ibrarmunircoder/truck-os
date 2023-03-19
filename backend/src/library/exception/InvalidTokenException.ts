import { BadRequestException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  details: string;
}

interface InvalidTokenExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Invalid token';

export class InvalidTokenException extends BadRequestException {
  constructor(error?: InvalidTokenExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.INVALID_TOKEN, error), description);
  }
}
