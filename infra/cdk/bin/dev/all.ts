import { TruckOSDataStack } from "../../lib/stack/truckOSData";
import { App } from "aws-cdk-lib";
import { dev } from "../environments";
import { TruckOSApplicationStack } from "../../lib/stack/truckOSApplication";

export const app = new App();

const dataStack = new TruckOSDataStack(app, "truckos-dev-data", {
  ...dev,
});

const appStack = new TruckOSApplicationStack(app, "truckos-dev-application", {
  ...dev,
  dataStack,
});

appStack.addDependency(dataStack, "Depends on data");
