import * as environments from "../bin/environments";
import * as AWS from "aws-sdk";
import * as fs from "fs";
import * as path from "path";
import { parse, stringify } from "envfile";
import { GetParametersByPathRequest } from "aws-sdk/clients/ssm";

const envOutput = path.resolve(__dirname, "..", "..", "..");
const requiredVariables = [
  /* Variables for per-environment Docker Image Repositories */

  "AWS_ACCOUNT_ID",
  "AWS_REGION",
  "BACKEND_IMAGE_REPO_URI",
  "FRONTEND_IMAGE_REPO_URI",

  /* Variables to trigger an ECS Deployment */
  "AWS_ECS_CLUSTER_NAME",
  "AWS_ECS_FRONTEND_SERVICE_NAME",
  "AWS_ECS_BACKEND_SERVICE_NAME",

  /* Legacy Variables from Roq */

  /* Legacy Roq Backend */
  "ROQ_PLATFORM_URL",

  /* Legacy Roq Frontend */

  "NEXT_PUBLIC_BACKEND_URL",
  "NEXT_PUBLIC_PLATFORM_URL",
  "NEXT_PUBLIC_LOCALE_DEFAULT",

  "NEXT_PUBLIC_PLATFORM_AUTHORIZATION_HEADER",
  "NEXT_PUBLIC_PLATFORM_REQUEST_ID_HEADER",
  "NEXT_PUBLIC_SOCKET_SECURE",
  "NEXT_PUBLIC_GATEWAY_ENABLED",
  "NEXT_PUBLIC_MAX_CHAT_CHARACTERS",
  "NEXT_PUBLIC_NOTIFICATION_FIRST_LOAD_COUNT",
  "NEXT_PUBLIC_NOTIFICATION_POLLING_DELAY_SECONDS",
  "NEXT_PUBLIC_NOTIFICATION_MAX_AGE_DAYS",
  "NEXT_PUBLIC_NOTIFICATION_PAGE_SIZE",
  "NEXT_PUBLIC_NOTIFICATION_FIRST_LOAD_COUNT",
  "NEXT_PUBLIC_TIMEZONE_LIST",
  "NEXT_PUBLIC_DEFAULT_TIMEZONE",

  "NEXT_PUBLIC_BACKEND_API_KEY",
  "TENANT_ID",
  "API_KEY",
  "ROQ_PLATFORM_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "LINKEDIN_CLIENT_ID",
  "LINKEDIN_CLIENT_SECRET",
  "APPLE_CLIENT_ID",
  "APPLE_CLIENT_SECRET",
  "NEXTAUTH_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_SESSION_TTL",
  "NEXTAUTH_ENCRYPTION_KEY",

  "NODE_ENV",

  "TRANSLATION_LOAD_CHUNK_SIZE",
];

async function run() {
  await Promise.all(
    Object.values(environments).map(async (environment) => {
      try {
        const roleArn = `arn:aws:iam::${environment.env.account}:role/OrganizationAccountAccessRole`;
        console.log(`Accessing ${environment.workspace} via ${roleArn}`);

        let masterCredentials = new AWS.SharedIniFileCredentials({ profile: "007696334690" });

        const isSso = true; // TO-DO: change this to a function to detect if one way or the other...
        if (isSso) {
          masterCredentials = new AWS.SsoCredentials({ profile: "007696334690" });
          process.env.AWS_SDK_LOAD_CONFIG = "1";
        }

        // const masterCredentials = new AWS.SharedIniFileCredentials({ profile: "007696334690" });
        const credentials = new AWS.ChainableTemporaryCredentials({
          masterCredentials: masterCredentials,
          params: {
            RoleArn: roleArn,
            RoleSessionName: "SyncEnvironmentSession",
          },
        });
        process.env.AWS_REGION = environment.env.region;
        AWS.config.credentials = credentials;
        try {
          await new Promise((resolve, reject) => {
            credentials.get((err: unknown) => {
              if (err) {
                reject(err);
              } else {
                resolve(undefined);
              }
            });
          });
        } catch (e: unknown) {
          console.error(`Failure with environment ${environment.workspace}:`, e);
          return;
        }
        console.log(`Access granted to ${environment.workspace} via ${roleArn}`);
        const ssmParameterLocation = `/${environment.appName}/${environment.workspace}/`;

        const ssm = new AWS.SSM({ credentials });
        console.log(`Resolving ${ssmParameterLocation} via SSM`);

        const nextRequest: GetParametersByPathRequest = {
          Path: ssmParameterLocation,
          MaxResults: 10,
        };
        const ssmValues: Record<string, string> = {};
        do {
          const response = await ssm.getParametersByPath(nextRequest).promise();
          response.Parameters?.forEach((parameter) => {
            const key = parameter.Name?.substring(ssmParameterLocation.length);
            if (!key || !parameter.Value) {
              return;
            }
            ssmValues[key] = parameter.Value;
          });
          nextRequest.NextToken = response.NextToken;
        } while (nextRequest.NextToken);

        const envPath = path.resolve(__dirname, "..", "env");
        const outputPath = path.resolve(envPath, `${environment.workspace}.json`);
        if (!fs.existsSync(envPath)) {
          fs.mkdirSync(envPath);
        }
        fs.writeFileSync(outputPath, JSON.stringify(ssmValues, null, 2));
        console.log(
          `Successfully downloaded ${ssmParameterLocation}* into ${outputPath} (${
            Object.entries(ssmValues).length
          } values)`
        );
        await envJSONToEnv([outputPath]);
      } catch (e) {
        console.error(`Failure with environment ${environment.workspace}:`, e);
      }
    })
  );
}

async function envJSONToEnv(envFiles: string[]) {
  /* TCR Notes: this is the set of environment variables that the frontend seems to use to configure itself */
  /* Not all of these are required, and many have defaults ; we'll try and get away with as little as we can */

  envFiles
    .filter((filePath) => fs.statSync(filePath).isFile() && filePath.endsWith(".json"))
    .forEach((filePath) => {
      const envName = path.basename(filePath).replace(/\.json$/, "");
      const envDetails = JSON.parse(fs.readFileSync(filePath).toString());
      const originFile = path.resolve(envOutput, `.env.${envName}`);
      let env: Record<string, string> = {};
      if (fs.existsSync(originFile)) {
        const current = parse(fs.readFileSync(originFile).toString());
        env = { ...current };
      }
      const envDetailsInEnvFileForm = Object.entries(envDetails)
        .filter(([k]) => requiredVariables.includes(k))
        .reduce(
          (acc, [k, v]) =>
            Object.assign(acc, {
              [k]: v,
            }),
          {}
        );
      env = { ...env, ...envDetailsInEnvFileForm };
      fs.writeFileSync(originFile, stringify(env));
      console.log(`Updated ${originFile} (${Object.entries(env).length} values)`);
    });
}

run();
