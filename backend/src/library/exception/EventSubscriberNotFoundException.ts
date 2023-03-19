import { NotFoundException } from '@nestjs/common';
import { ErrorCodeEnum } from 'src/library/enums';
import { prepareError } from 'src/library/exception/utils';

interface VariablesInterface {
  id: string;
}

export interface EventSubscriberNotFoundExceptionInterface {
  message?: string;
  variables: VariablesInterface;
}

const defaultMessage = 'EventSubscriber with id {{id}} not found';

export class EventSubscriberNotFoundException extends NotFoundException {
  constructor(error: EventSubscriberNotFoundExceptionInterface, description?: string) {
    super(prepareError(defaultMessage, ErrorCodeEnum.EVENT_SUBSCRIBER_NOT_FOUND, error), description);
  }
}
