import { EnvironmentDNSStack } from "../../lib/stack/environmentDNS";
import { App } from "aws-cdk-lib";
import { ImageRepositoryStack } from "../../lib/stack/imageRepositories";
import { GitlabContinuousDeploymentStack } from "../../lib/stack/gitlabContinuousDeployment";
import { prod } from "../environments";
import { SSMVariablesStack } from "../../lib/stack/ssmVariables";
import { TruckOSNetworkStack } from "../../lib/stack/truckOSNetwork";

export const app = new App();

new EnvironmentDNSStack(app, "truckos-prod-hosted-zone", {
  ...prod,
  hostedZoneName: "app.truckos.com",
  registerSSLCertificate: true,
});

const imageRepoStack = new ImageRepositoryStack(app, "truckos-prod-ecr", prod);

new SSMVariablesStack(app, "truckos-prod-variables", {
  ...prod,
  envVars: {
    API_KEY: "91437b00-73ff-4def-9692-9ac262e20a8f",
    APP_ENVIRONMENT: "production",
    BACKEND_API_KEY:
      "YCaGRtr3wjlCMlRFYXwgqeLkAQwINJzv0HDWZfUeFF6fkViWJ9haehMUrluA74u7GxIRM09ye6SGiosJJc8zMTbSgctM1XIz9z56x4zKVwU4kZJZcmOQvFQD0hlc4byrUxLEgdYaebMuq4vcka0tAgEqJ2fAz0H87saYCWEe8ukGCx9gJd0c3rWF9jFp9aaI4QWWUr3TjFpoxOAO8HojditRj2KDRtxOFrGQ74f9hXTeeN4qHzFhuSYqBjpjoGZv",
    CLOUD_LOGS_NAME: "roq-one-backend",
    DEFAULT_LANGUAGE: "de_DE",
    ENABLE_DOCS: "false",
    ENVIRONMENT: "production",
    JWT_SECRET: "2b64af22-79fb-469a-91c8-29b38b97bd2d",
    JWT_TTL: "3600",
    NAMESPACE: "truckos",
    NEXT_PUBLIC_LOCALE_DEFAULT: "en",
    NEXT_PUBLIC_PLATFORM_HOST: "https://saturn-pp.roq-platform.com",
    NEXT_PUBLIC_PLATFORM_URL: "https://saturn-pp.roq-platform.com/v01",
    NEXT_PUBLIC_SOCKET_BACKEND_URL: "https://saturn-pp-socket.roq-platform.com/socket.io",
    NEXT_PUBLIC_SOCKET_PLATFORM_URL: "https://saturn-pp-socket.roq-platform.com/socket.io",
    NODE_ENV: "production",
    NODE_ENVIRONMENT: "production",
    ROQ_PLATFORM_HOST: "https://saturn-pp.roq-platform.com",
    ROQ_PLATFORM_URL: "https://saturn-pp.roq-platform.com/v01",
    TENANT_ID: "81e3aeaf-4d62-48b4-bf17-7877b9ba25d0",
    WALBING_BASE_URL: "https://marketplace.walbing.com/jwt/v1.0",
    WALBING_WEBHOOK_SECRET_KEY: "3bdf7a635ef01fef71c4e31b244bdc35",
  },
});

new TruckOSNetworkStack(app, "truckos-prod-network", prod);

new GitlabContinuousDeploymentStack(app, "truckos-prod-gitlab", { ...prod, imageRepos: imageRepoStack });
