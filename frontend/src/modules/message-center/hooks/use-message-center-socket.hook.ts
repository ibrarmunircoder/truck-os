/* eslint-disable @roq/name-of-class-and-function-rule */
import client from 'configuration/socket/socket-client';
import _noop from 'lodash/fp/noop';
import { MessageCenterSocket, MessageCenterSocketInterface } from 'modules/message-center/utils';
import { useState } from 'react';

const DEFAULT_NAMESPACE = 'messageCenter';

export const useMessageCenterSocket = (namespace?: string): [MessageCenterSocketInterface | null, () => void] => {
  // SSR fix
  if (!process.browser) {
    return [null, _noop];
  }

  const [current, setCurrent] = useState<MessageCenterSocketInterface>(null);

  function getObserver() {
    if (current === null) {
      const nextCurrent = new MessageCenterSocket(client(namespace ?? DEFAULT_NAMESPACE));
      setCurrent(nextCurrent);
      return nextCurrent;
    }
    return current;
  }

  function close() {
    if (current === null) {
      return;
    }
    current.disconnect();
    setCurrent(null);
  }

  return [getObserver(), close];
};
