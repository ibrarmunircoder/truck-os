import { Construct } from "constructs";
import { Stack, Tags } from "aws-cdk-lib";
import { HostedZoneAttributes } from "aws-cdk-lib/aws-route53/lib/hosted-zone-ref";
import * as cdk from "aws-cdk-lib";
import { NsRecord, HostedZone } from "aws-cdk-lib/aws-route53";

export interface RootDNSStackProps extends cdk.StackProps {
  hostedZone: HostedZoneAttributes;
  subdomainsNSRecords: Record<string, string[]>;
}

export class RootDNSStack extends Stack {
  constructor(scope: Construct, id: string, props: RootDNSStackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "RootDNS");
    const zone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", props.hostedZone);

    for (const [subdomain, nsRecords] of Object.entries(props.subdomainsNSRecords)) {
      new NsRecord(this, `${subdomain}-NS`, {
        recordName: subdomain,
        values: nsRecords,
        zone,
      });
    }
  }
}
