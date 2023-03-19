import { Stage, StageProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { TruckOSApplicationProps } from "../stack/truckOSApplication";

export const createTruckOSStacks = (scope: Construct, props: TruckOSApplicationProps, wrapWithId?: string) => {
  let app = scope;
  if (wrapWithId) {
    app = new Construct(app, wrapWithId);
    app = new Construct(app, "TruckOSInfraStage");
  }

  Tags.of(app).add("user:Application", props.appName);
};

export class TruckOSInfraStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps & TruckOSApplicationProps) {
    super(scope, id, props);
    createTruckOSStacks(this, props);
  }
}
