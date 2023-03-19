import { BadRequestException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  defaultLocale: string;
}

interface DefaultLocaleUndefinedExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = 'Default locale {{defaultLocale}} undefined';

export class DefaultLocaleUndefinedException extends BadRequestException {
  constructor(error: DefaultLocaleUndefinedExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.DEFAULT_LOCALE_UNDEFINED, error), description);
  }
}
