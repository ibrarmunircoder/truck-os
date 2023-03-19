import { App } from "aws-cdk-lib";
import { RootDNSStack } from "../../lib/stack/rootDNS";

export const app = new App();

new RootDNSStack(app, "truckos-com-dns", {
  hostedZone: {
    hostedZoneId: "Z08908533I3CKWCRMXN30",
    zoneName: "truckos.com",
  },
  subdomainsNSRecords: {
    "dev.truckos.com": [
      "ns-833.awsdns-40.net",
      "ns-1557.awsdns-02.co.uk",
      "ns-1111.awsdns-10.org",
      "ns-168.awsdns-21.com",
    ],
    "app.truckos.com": [
      "ns-1445.awsdns-52.org",
      "ns-143.awsdns-17.com",
      "ns-1537.awsdns-00.co.uk",
      "ns-1012.awsdns-62.net",
    ],
  },
  env: {
    region: "eu-west-1",
    account: "007696334690",
  },
});
