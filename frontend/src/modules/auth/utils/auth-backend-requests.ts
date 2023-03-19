import { publicConfig } from "configuration/app";

interface AuthBackendRequestParamsInterface {
  graphqlEndpoint: string,
  query:string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: Record<string, any>,
  resultField?: string,
  swallowError?: boolean
}
async function backendRequest({ graphqlEndpoint, query, variables, headers, resultField, swallowError }: AuthBackendRequestParamsInterface) {
  const fetchResult = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables
    }),
  });

  return fetchResult.json().then(json => {
    if (!swallowError && json?.errors?.[0]) {
      // @todo: for now we handle only message, in future we can have better shape for such error
      throw new Error(JSON.stringify(json?.errors));
    }
    return json?.data?.[resultField] || null
  });
};

export const createAuthBackendRequests = (graphqlEndpoint: string, apiKey: string) => ({
  login: (data) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation loginMutation($data: LoginDto!) {
        login(input: $data) {
          accessToken
          refreshToken
          platformAccessToken
        }
      }
    `,
    variables: { data },
    resultField: 'login'
  }),
  accountActivate: (data) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation accountActivateMutation($data: AccountActivateDto!) {
        accountActivate(input: $data) {
          accessToken
          refreshToken
          platformAccessToken
        }
      }
    `,
    variables: { data },
    resultField: 'accountActivate'
  }),
  restorePassword: (data) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation restorePasswordMutation($data: RestorePasswordDto!) {
        restorePassword(input: $data) {
          accessToken
          refreshToken
          platformAccessToken
        }
      }
    `,
    variables: { data },
    resultField: 'restorePassword'
  }),
  providerLogin: (data) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation providerLoginMutation($data: ProviderLoginDto!) {
        providerLogin(input: $data) {
          accessToken
          refreshToken
          platformAccessToken
        }
      }

    `,
    variables: { data },
    resultField: 'providerLogin',
    headers: { 'X-API-Key': apiKey },
    swallowError: true,
  }),
  getUserInfo: (accessToken, platformAccessToken) => backendRequest({
    graphqlEndpoint,
    query: `
      query getUserInfoQuery {
        whoAmI {
          id
          email
          firstName
          lastName
          timezone
          avatar
          locale
          roqIdentifier
          connectedProviderIds
          apiKey
        }
      }
    `,
    resultField: 'whoAmI',
    headers: { authorization: `Bearer ${accessToken}`, [publicConfig.platform.authorizationHeader]: `Bearer ${platformAccessToken}` },
    swallowError: true,
  }),
  logout: (refreshToken) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation logoutMutation {
        logout
      }
    `,
    resultField: 'logout',
    headers: { authorization: `Bearer ${refreshToken}` },
    swallowError: true,
  }),
  refreshTokens: (refreshToken) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation refreshTokensMutation{
        refreshTokens {
          accessToken
          refreshToken
        }
      }
    `,
    resultField: 'refreshTokens',
    headers: { authorization: `Bearer ${refreshToken}` },
    swallowError: true,
  }),
  createPlatformToken: (accessToken) => backendRequest({
    graphqlEndpoint,
    query: `
      mutation createPlatformTokenMutation{
        createPlatformToken {
          accessToken
        }
      }
    `,
    resultField: 'createPlatformToken',
    headers: { authorization: `Bearer ${accessToken}` },
    swallowError: true,
  }),
}) as const
