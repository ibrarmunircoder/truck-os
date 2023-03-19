import { NotFoundException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  id: string;
}

interface EventTypeNotFoundExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = 'EventType with id {{id}} not found';

export class EventTypeNotFoundException extends NotFoundException {
  constructor(error: EventTypeNotFoundExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.EVENT_TYPE_NOT_FOUND, error), description);
  }
}
