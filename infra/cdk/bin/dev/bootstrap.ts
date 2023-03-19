import { EnvironmentDNSStack } from "../../lib/stack/environmentDNS";
import { App } from "aws-cdk-lib";
import { ImageRepositoryStack } from "../../lib/stack/imageRepositories";
import { GitlabContinuousDeploymentStack } from "../../lib/stack/gitlabContinuousDeployment";
import { dev } from "../environments";
import { SSMVariablesStack } from "../../lib/stack/ssmVariables";
import { TruckOSNetworkStack } from "../../lib/stack/truckOSNetwork";

export const app = new App();

new EnvironmentDNSStack(app, "truckos-dev-hosted-zone", {
  ...dev,
  hostedZoneName: "dev.truckos.com",
  registerSSLCertificate: true,
});

const imageRepoStack = new ImageRepositoryStack(app, "truckos-dev-ecr", dev);

new SSMVariablesStack(app, "truckos-dev-variables", {
  ...dev,
  envVars: {
    API_KEY: "92a606db-a767-458d-bc8b-05562ac514f8",
    APP_ENVIRONMENT: "development",
    BACKEND_API_KEY: "CHANGEME", //empty and let default...
    CLOUD_LOGS_NAME: "roq-one-backend",
    DEFAULT_LANGUAGE: "de_DE",
    ENABLE_DOCS: "false",
    ENVIRONMENT: "development",
    JWT_SECRET: "c3baf7eb-158b-445d-8ccd-ef138384df3c",
    JWT_TTL: "3600",
    NAMESPACE: "truckos",
    NEXT_PUBLIC_LOCALE_DEFAULT: "en",
    NEXT_PUBLIC_PLATFORM_HOST: "https://saturn-pp.roq-platform.com",
    NEXT_PUBLIC_PLATFORM_URL: "https://saturn-pp.roq-platform.com/v01",
    NEXT_PUBLIC_SOCKET_BACKEND_URL: "https://saturn-pp-socket.roq-platform.com/socket.io",
    NEXT_PUBLIC_SOCKET_PLATFORM_URL: "https://saturn-pp-socket.roq-platform.com/socket.io",
    NODE_ENV: "development",
    NODE_ENVIRONMENT: "development",
    ROQ_PLATFORM_HOST: "https://saturn-pp.roq-platform.com",
    ROQ_PLATFORM_URL: "https://saturn-pp.roq-platform.com/v01",
    TENANT_ID: "fbdaa685-d335-46f2-93a4-33ac4b4ef4ff",
    WALBING_BASE_URL: "https://ptest.walbing.com/jwt/v1.0",
    WALBING_WEBHOOK_SECRET_KEY: "1a1a9cafa49fa76e82ffee1543a884eeeeb9e8389f371a45f3e913524b7a3583",
  },
});

const networkStack = new TruckOSNetworkStack(app, "truckos-dev-network", dev);

new GitlabContinuousDeploymentStack(app, "truckos-dev-gitlab", {
  ...dev,
  imageRepos: imageRepoStack,
  network: networkStack,
});
