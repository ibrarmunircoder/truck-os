/* eslint-disable @roq/name-of-class-and-function-rule */
/* it is giving error for getObserver method */
import client, { SocketClientInterface } from 'configuration/socket/socket-client';
import { useState } from 'react';

export const useSocket = (namespace?: string): [SocketClientInterface | null] => {
  // SSR fix
  if (!process.browser) {
    return [null];
  }

  const [current, setCurrent] = useState<SocketClientInterface>(null);
  
  function getObserver() {
    if (current === null) {
      const nextCurrent = client(namespace)
      setCurrent(nextCurrent)
      return nextCurrent
    }
    return current;
  }

  return [getObserver()];
};
