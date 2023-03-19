import Emitter from 'component-emitter';
import { publicConfig } from 'configuration/app'
import store, { StoreInterface } from 'configuration/redux/store';
import isEmpty from 'lodash/isEmpty';
import { io, Manager, Socket } from 'socket.io-client';

export interface SocketClientInterface extends Omit<Socket, 'removeAllListeners'> {
  io: Manager;
  handlers: number;
  disconnectAndRemoveFromCache: () => Emitter<string>;
  setPlatformToken: (platformToken: string) => void;
  removeAllListeners: () => Emitter<string>;
}

const clients = new Map<string, SocketClientInterface>();

const setPlatformToken = (platformToken: string): void => {
  clients.forEach((client) => {
    client.io.opts.extraHeaders.PlatformToken = platformToken;
  });
};

// eslint-disable-next-line @roq/exports-should-follow-conventions
export default function socketClient(namespace = ''): SocketClientInterface | null {
  if (!process.browser) {
    return null;
  }

  const cachedName = isEmpty(namespace) ? 'default' : namespace;

  if (!clients.has(cachedName)) {
    const {
      auth: { platformAccessToken },
    } = store.getState() as StoreInterface;

    const socketUrl = new URL(publicConfig.platform.socketUri);

    const clientInstance = io(`${socketUrl.origin}/${namespace}`, {
      secure: publicConfig.platform.socketSecure,
      path: socketUrl.pathname,
      transports: ['polling', 'websocket'],
      autoConnect: false,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionAttempts: Infinity,
      extraHeaders: {
        PlatformToken: platformAccessToken,
      },
    }) as unknown as SocketClientInterface;

    clientInstance.handlers = 0;
    clientInstance.setPlatformToken = setPlatformToken;
    clientInstance.disconnectAndRemoveFromCache = () => {
      const client = clients.get(cachedName);
      let emitter = null;
      if (client) {
        emitter = client.removeAllListeners();
        client.close();
      }
      clients.delete(cachedName)
      return emitter;
    }

    clients.set(cachedName, clientInstance);
  }

  return clients.get(cachedName);
}
