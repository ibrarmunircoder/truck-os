/* eslint-disable @roq/name-of-class-and-function-rule, @roq/filename-suffix-mismatch, @roq/no-invalid-filename-chars */
import { ForbiddenException as _ForbiddenException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface BasicForbiddenExceptionInterface {
  message?: string;
  variables: {
    resourceId: string;
    entityName: string;
  };
}

const defaultMessage = '{{resourceId}} is required to access {{entityName}}';

export class ForbiddenException extends _ForbiddenException {
  constructor(error: BasicForbiddenExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.FORBIDDEN, error), description);
  }
}
