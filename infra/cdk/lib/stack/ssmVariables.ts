import { Construct } from "constructs";
import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";

interface SSMVariablesProps extends TruckOSApplicationProps {
  envVars: Record<string, string>;
}

export class SSMVariablesStack extends Stack {
  constructor(scope: Construct, id: string, props: SSMVariablesProps & StackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "SSMVariables");
    Tags.of(this).add("workspace", props.workspace);

    for (const [key, value] of Object.entries(props.envVars)) {
      new StringParameter(this, `${key}SSM`, {
        parameterName: `/${props.appName}/${props.workspace}/${key}`,
        stringValue: value,
        tier: ParameterTier.STANDARD,
      });
    }
  }
}
