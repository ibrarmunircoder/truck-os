import { Construct } from "constructs";
import { Stack, Tags } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";

export interface EnvironmentDNSStackProps extends cdk.StackProps {
  hostedZoneName: string;
  registerSSLCertificate: boolean;
}

export class EnvironmentDNSStack extends Stack {
  constructor(scope: Construct, id: string, props: TruckOSApplicationProps & EnvironmentDNSStackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "EnvironmentDNS");
    Tags.of(this).add("workspace", props.workspace);

    const hostedZone = new HostedZone(this, `ApplicationDNSZone`, {
      zoneName: props.hostedZoneName,
    });

    new StringParameter(this, `HostedZoneIdSSM`, {
      parameterName: `/${props.appName}/${props.workspace}/HOSTED_ZONE_ID`,
      stringValue: hostedZone.hostedZoneId,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, `HostedZoneNameSSM`, {
      parameterName: `/${props.appName}/${props.workspace}/HOSTED_ZONE_NAME`,
      stringValue: hostedZone.zoneName,
      tier: ParameterTier.STANDARD,
    });

    if (props.registerSSLCertificate) {
      const managedCertificate = new DnsValidatedCertificate(this, "ManagedCertificate", {
        domainName: props.hostedZoneName,
        hostedZone: hostedZone,
      });
      new StringParameter(this, `CertificateSSM`, {
        parameterName: `/${props.appName}/${props.workspace}/CERTIFICATE_ARN`,
        stringValue: managedCertificate.certificateArn,
        tier: ParameterTier.STANDARD,
      });
    }
  }
}
