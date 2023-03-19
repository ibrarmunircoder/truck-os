import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";

export class TruckOSNetworkStack extends Stack {
  public readonly vpc: Vpc;
  constructor(scope: Construct, id: string, props: TruckOSApplicationProps & StackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "TruckOSNetwork");
    Tags.of(this).add("workspace", props.workspace);

    this.vpc = new Vpc(this, "VPC", {
      maxAzs: 2,
      natGateways: 2,
    });

    new StringParameter(this, `VpcIDSSM`, {
      parameterName: `/${props.appName}/${props.workspace}/VPC_ID`,
      stringValue: this.vpc.vpcId,
      tier: ParameterTier.STANDARD,
    });
  }
}
