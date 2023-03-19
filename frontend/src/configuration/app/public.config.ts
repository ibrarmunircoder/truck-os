import { publicRuntimeConfig } from 'configuration/app/next-runtime.config';
import { yup } from 'modules/common/validation';
import { setConfig } from 'next/config';

setConfig({ publicRuntimeConfig });

// TCR Notes:
//   This pattern implies we have no trivial capability to use the same docker image in production as in dev.
//   We have to independently maintain one image per environment and compile these values into the image.

const platformUrl = yup
  .string()
  .trim()
  .default('https://saturn-pp.roq-platform.com/v01')
  .validateSync(publicRuntimeConfig.NEXT_PUBLIC_PLATFORM_URL);

const backendUrl = yup
  .string()
  .trim()
  .default('http://localhost:3001')
  .validateSync(publicRuntimeConfig.NEXT_PUBLIC_BACKEND_URL);

export const publicConfig = Object.freeze({
  backend: {
    url: backendUrl,
    graphqlUri: `${backendUrl}/graphql`,
  },
  platform: {
    url: platformUrl,
    graphqlUri: `${platformUrl}/graphql`,
    authorizationHeader: yup
      .string()
      .trim()
      .default('roq-platform-authorization')
      .validateSync(process.env.NEXT_PUBLIC_PLATFORM_AUTHORIZATION_HEADER),
    requestIdHeader: yup
      .string()
      .trim()
      .default('request-id')
      .validateSync(process.env.NEXT_PUBLIC_PLATFORM_REQUEST_ID_HEADER),
    socketUri: `${platformUrl}/socket.io`,
    socketSecure: yup.boolean().default(false).validateSync(process.env.NEXT_PUBLIC_SOCKET_SECURE),
    gatewayEnabled: yup.boolean().default(true).validateSync(process.env.NEXT_PUBLIC_GATEWAY_ENABLED),
  },
  frontend: {
    maxChatCharacters: yup.number().default(1000).validateSync(process.env.NEXT_PUBLIC_MAX_CHAT_CHARACTERS),
    notificationFirstLoadCount: yup
      .number()
      .default(20)
      .validateSync(process.env.NEXT_PUBLIC_NOTIFICATION_FIRST_LOAD_COUNT),
    notificationPollingDelaySeconds: yup
      .number()
      .default(15)
      .validateSync(process.env.NEXT_PUBLIC_NOTIFICATION_POLLING_DELAY_SECONDS),
    notificationMaxAgeDays: yup.number().default(28).validateSync(process.env.NEXT_PUBLIC_NOTIFICATION_MAX_AGE_DAYS),
    notificationPageSize: yup.number().default(20).validateSync(process.env.NEXT_PUBLIC_NOTIFICATION_PAGE_SIZE),
  },
  timezone: {
    options: yup
      .array()
      .nullable()
      .validateSync(JSON.parse(process.env.NEXT_PUBLIC_TIMEZONE_LIST ?? null)),
    default: yup.string().trim().default('Europe/Berlin').validateSync(process.env.NEXT_PUBLIC_DEFAULT_TIMEZONE),
  },
});
