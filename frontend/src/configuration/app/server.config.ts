import { yup } from 'modules/common/validation';

export interface AppPrivateConfigInterface {
  backend: {
    apiKey: string;
  };
  platform: {
    tenantId: string;
    apiKey: string;
    serviceAccount: string;
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  linkedin: {
    clientId: string;
    clientSecret: string;
  };
  apple: {
    clientId: string;
    clientSecret: string;
  };
  nextAuth: {
    secret: string;
    session: {
      maxAge?: number;
    };
    jwt: {
      secret?: string;
    };
  };
}

let serverConfig: AppPrivateConfigInterface;

if (typeof window === 'undefined') {
  // will be cutted by webpack on client side
  serverConfig = Object.freeze({
    backend: {
      apiKey: yup.string().trim().default('CHANGE_ME_3').validateSync(process.env.NEXT_PUBLIC_BACKEND_API_KEY),
    },
    platform: {
      tenantId: yup.string().trim().default('fbdaa685-d335-46f2-93a4-33ac4b4ef4ff').validateSync(process.env.TENANT_ID),
      apiKey: yup.string().trim().default('92a606db-a767-458d-bc8b-05562ac514f8').validateSync(process.env.API_KEY),
      serviceAccount: yup
        .string()
        .trim()
        .default('project-service-account@roq.tech')
        .validateSync(process.env.ROQ_PLATFORM_SERVICE_ACCOUNT_EMAIL),
    },
    google: {
      clientId: yup
        .string()
        .trim()
        .default('CHANGE_ME_GOOGLE_CLIENT_ID_DEFAULT')
        .validateSync(process.env.GOOGLE_CLIENT_ID),
      clientSecret: yup
        .string()
        .trim()
        .default('CHANGE_ME_GOOGLE_CLIENT_SECRET')
        .validateSync(process.env.GOOGLE_CLIENT_SECRET),
    },
    linkedin: {
      clientId: yup
        .string()
        .trim()
        .default('CHANGE_ME_LINKEDIN_CLIENT_ID')
        .validateSync(process.env.LINKEDIN_CLIENT_ID),
      clientSecret: yup
        .string()
        .trim()
        .default('CHANGE_ME_LINKEDIN_CLIENT_SECRET')
        .validateSync(process.env.LINKEDIN_CLIENT_SECRET),
    },
    apple: {
      clientId: yup.string().trim().default('CHANGE_ME_APPLE_CLIENT_ID').validateSync(process.env.APPLE_CLIENT_ID),
      clientSecret: yup
        .string()
        .trim()
        .default('CHANGE_ME_APPLE_CLIENT_SECRET')
        .validateSync(process.env.APPLE_CLIENT_SECRET),
    },
    nextAuth: {
      secret: yup.string().trim().default('CHANGE_ME_4').validateSync(process.env.NEXTAUTH_SECRET),
      session: {
        maxAge: yup
          .number()
          .default(30 * 24 * 60 * 60)
          .validateSync(process.env.NEXTAUTH_SESSION_TTL),
      },
      jwt: {
        secret: yup.string().trim().default('CHANGE_ME_5').validateSync(process.env.NEXTAUTH_ENCRYPTION_KEY),
      },
    },
  });
}
export { serverConfig };
