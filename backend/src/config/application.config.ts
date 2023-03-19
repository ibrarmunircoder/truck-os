import { registerAs } from '@nestjs/config';

const dbPassword = encodeURIComponent(process.env.DATABASE_PASSWORD);

export const applicationConfig = registerAs('application', () => ({
  apiUri: process.env.API_URI,
  apiKey: process.env.ROQ_ONE_API_KEY,
  appName: process.env.APP_NAME,
  appEnvironment: process.env.APP_ENVIRONMENT,
  appProject: process.env.APP_PROJECT,
  consoleLogs: process.env.CONSOLE_LOGS_ENABLED === 'true',
  cloudLogs: process.env.CLOUD_LOGS_ENABLED === 'true',
  cloudLogsName: process.env.CLOUD_LOGS_NAME,
  fileLogs: process.env.FILE_LOGS_ENABLED === 'true',
  logsSkipFields: process.env.LOGS_SKIP_FIELDS.trim().split(','),
  databaseUrl: process.env.DATABASE_USERNAME
    ? `postgres://${process.env.DATABASE_USERNAME}:${dbPassword}@${process.env.DATABASE_ENDPOINT}/${process.env.DATABASE_NAME}?sslmode=require`
    : process.env.DATABASE_URL,
  databaseLogging: process.env.DATABASE_LOGS === 'true',
  debug: process.env.DEBUG === 'true',
  defaultLanguage: process.env.DEFAULT_LANGUAGE,
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  jwt: {
    access: {
      secret: process.env.JWT_SECRET,
      expiresIn: parseInt(process.env.JWT_TTL, 10),
    },
  },
  serviceAccount: {
    email: process.env.ROQ_PLATFORM_SERVICE_ACCOUNT_EMAIL,
    cache: {
      ttl: process.env.ROQ_PLATFORM_SERVICE_ACCOUNT_CACHE_TTL,
      key: process.env.ROQ_PLATFORM_SERVICE_ACCOUNT_TOKEN_CACHE_KEY,
    },
  },
  newrelic: process.env.NEW_RELIC_ENABLE === 'true',
  newRelicConfigLocation: process.env.NEW_RELIC_HOME,
  port: process.env.PORT,
  resetPasswordTokenExpires: parseInt(process.env.RESET_PASSWORD_EXPIRES_HOURS, 10),
  validateEmailTokenExpires: parseInt(process.env.VALIDATE_EMAIL_EXPIRES_HOURS, 10),
  linkToAccountTokenExpires: parseInt(process.env.LINK_TO_ACCOUNT_EXPIRES_HOURS, 10),
  queryLimit: parseInt(process.env.QUERY_LIMIT, 10),
  queryDepthLimit: parseInt(process.env.MAX_GRAPHQL_QUERY_DEPTH, 10),
  queryDepthIgnoreFields: process.env.QUERY_DEPTH_IGNORE_FIELDS.split(','),
  platform: {
    userSyncCronInterval: process.env.ROQ_PLATFORM_USER_SYNC_CRON_INTERVAL,
    url: process.env.ROQ_PLATFORM_URL,
    graphqlUri: `${process.env.ROQ_PLATFORM_URL}/server/graphql`,
    socketUri: `${process.env.ROQ_PLATFORM_URL}/socket.io`,
    authorizationHeader: process.env.ROQ_PLATFORM_AUTHORIZATION_HEADER,
    requestIdHeader: process.env.ROQ_PLATFORM_REQUEST_ID_HEADER,
    requestCallerHeader: process.env.ROQ_PLATFORM_REQUEST_CALLER_HEADER,
    userIdHeader: process.env.ROQ_PLATFORM_USER_ID_HEADER,
    apiKey: process.env.API_KEY,
    tenantId: process.env.TENANT_ID,
  },
  writeSignedUrlValidMS: parseInt(process.env.WRITE_SIGNED_URL_VALID_MS, 10),
  defaultMaxFileSizeBytes: parseInt(process.env.DEFAULT_FILE_MAX_SIZE_BYTES, 10),
  enableDocs: process.env.ENABLE_DOCS === 'true',
  frontendUrl: process.env.FRONTEND_URL,
  userInvite: {
    maxPerRequest: parseInt(process.env.MAX_INVITE_PER_REQUEST, 10),
    mailType: process.env.INVITE_EMAIL_TYPE,
  },
  maxConcurrencyLimit: parseInt(process.env.MAX_CONCURRENCY_LIMIT, 10),
  entityListener: {
    eventName: process.env.ENTITY_LISTENER_EVENTS_NAME,
    excludedFields: {
      ...process.env.BLACKLISTED_FIELDS.split(' ')
        .map((field) => {
          const [key, value] = field.split(':');
          return { [key]: value.split(',') };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    },
  },
  collationLocales: {
    ...process.env.DB_COLLATION_LOCALES.split(';')
      .map((pair) => {
        const [collation, operators, locale] = pair.split(':');
        return {
          [collation]: {
            locale,
            operators,
          },
        };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  },
  autoEmailConfirmation: process.env.AUTO_EMAIL_CONFIRMATION === 'true',
  importDataConfigs: process.env.IMPORT_DATA_CONFIG.split(';'),
  isConsoleCommand: process.env.IS_CONSOLE_COMMAND === 'true',
  walbingPaymentProcessor: {
    baseUrl: process.env.WALBING_BASE_URL,
    authorizationHeader: process.env.WALBING_AUTHORIZATION_HEADER,
    apiKey: process.env.WALBING_API_KEY,
    invitationCode: process.env.WALBING_INVITATION_CODE,
    walbingWebhookSecretKey: process.env.WALBING_WEBHOOK_SECRET_KEY,
  },
  invoiceCurrency: process.env.INVOICE_CURRENCY,
  bankTagName: process.env.BANK_TAG_NAME,
  apiKeyHashSecret: process.env.API_KEY_HASH_SECRET,
  superUsers: process.env.SUPER_USERS?.split(',') || [],
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  baseUrl: process.env.BASE_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsS3SignedUrlExpire: parseInt(process.env.AWS_S3_SIGNED_URL_EXPIRE, 10),
  awsS3bucketName: process.env.AWS_S3_BUCKET_NAME,
}));
