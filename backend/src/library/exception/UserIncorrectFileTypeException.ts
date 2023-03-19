import { BadRequestException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  details: string;
}

interface UserIncorrectFileTypeExceptionInterface {
  message?: string;
  variables?: VariablesInterface;
}

const defaultMessage = 'Incorrect file type';

export class UserIncorrectFileTypeException extends BadRequestException {
  constructor(error?: UserIncorrectFileTypeExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.USER_INCORRECT_FILE_TYPE, error), description);
  }
}
