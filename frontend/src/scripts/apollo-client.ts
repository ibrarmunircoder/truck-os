import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { publicConfig } from 'configuration/app';
import fetcher from 'isomorphic-fetch';
import { authorizeServiceAccount } from 'scripts/authorize-service-account';
import { uuid as uuidv4 } from 'uuidv4';

let clientSingleton;
let token;
export function apolloClient(): ApolloClient<InMemoryCache> {
  if (!clientSingleton) {
    const serverAddress = `${publicConfig.platform.graphqlUri}`;

    const httpLink = createHttpLink({
      uri: serverAddress,
      fetchOptions: {
        fetch: fetcher,
      },
    });

    const authLink = setContext(async (_, { headers }) => {
      const timezone = 'UTC';
      if (!token) {
        token = await authorizeServiceAccount();
      }
      return {
        headers: {
          ...headers,
          timezone,
          [publicConfig.platform.requestIdHeader]: uuidv4(),
          [publicConfig.platform.authorizationHeader]: 'Bearer ' + token,
        },
      };
    });

    clientSingleton = new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }

  return clientSingleton;
}
