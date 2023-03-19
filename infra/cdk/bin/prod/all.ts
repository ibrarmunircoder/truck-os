import { TruckOSDataStack } from "../../lib/stack/truckOSData";
import { App } from "aws-cdk-lib";
import { prod } from "../environments";
import { TruckOSApplicationStack } from "../../lib/stack/truckOSApplication";

export const app = new App();

const dataStack = new TruckOSDataStack(app, "truckos-prod-data", {
  ...prod,
});

const appStack = new TruckOSApplicationStack(app, "truckos-prod-application", {
  ...prod,
  dataStack,
});

appStack.addDependency(dataStack, "Depends on data");
