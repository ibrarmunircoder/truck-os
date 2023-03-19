import { Aspects, RemovalPolicy, SecretValue, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { InstanceType, IVpc, Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import {
  AuroraPostgresEngineVersion,
  CfnDBCluster,
  Credentials,
  DatabaseCluster,
  DatabaseClusterEngine,
  DatabaseProxy,
  ProxyTarget,
} from "aws-cdk-lib/aws-rds";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Secret, SecretRotation, SecretRotationApplication } from "aws-cdk-lib/aws-secretsmanager";
import { AccessKey, User } from "aws-cdk-lib/aws-iam";
import { Bucket, BucketEncryption, HttpMethods } from "aws-cdk-lib/aws-s3";

export class TruckOSDataStack extends Stack {
  public readonly cluster: DatabaseCluster;
  public readonly dbUsername: string;
  public readonly socketAddr: string;
  public readonly defaultDB: string;
  public readonly credentials: Credentials;
  public readonly securityGroup: SecurityGroup;
  public readonly proxy: DatabaseProxy;
  public readonly frontendLogGroup: LogGroup;
  public readonly backendLogGroup: LogGroup;

  constructor(scope: Construct, id: string, props: TruckOSApplicationProps & StackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "TruckOSData");
    Tags.of(this).add("workspace", props.workspace);

    const vpcID = StringParameter.valueFromLookup(this, `/${props.appName}/${props.workspace}/VPC_ID`);

    const vpc = Vpc.fromLookup(this, "TruckOSVPC", {
      vpcId: vpcID,
    });

    const databaseResult = TruckOSDataStack.createTruckOsDatabase(this, vpc, props);
    this.cluster = databaseResult.cluster;
    this.dbUsername = databaseResult.dbUsername;
    this.socketAddr = databaseResult.socketAddr;
    this.defaultDB = databaseResult.defaultDB;
    this.credentials = databaseResult.credentials;
    this.securityGroup = databaseResult.securityGroup;
    this.proxy = databaseResult.proxy;

    TruckOSDataStack.createDocumentStorageBucket(this, props);

    this.frontendLogGroup = new LogGroup(this, "FrontendLogGroup", {
      logGroupName: `/ecs/${props.appName}/${props.workspace}/frontend`,
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.backendLogGroup = new LogGroup(this, "BackendLogGroup", {
      logGroupName: `/ecs/${props.appName}/${props.workspace}/backend`,
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }

  static createDocumentStorageBucket(scope: Construct, props: TruckOSApplicationProps) {
    const user = new User(scope, "BucketUser");
    const accessKey = new AccessKey(scope, "BucketAccessKey", { user });

    const hostedZoneName = this.lookupSSMDeployTime(scope, "HOSTED_ZONE_NAME", props);

    const bucket = new Bucket(scope, "DocumentsBucket", {
      encryption: BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [HttpMethods.PUT],
          allowedOrigins: [`https://${hostedZoneName}`],
          exposedHeaders: [],
        },
      ],
    });

    const secret = new Secret(scope, "DocumentStorageBucketKey", {
      secretObjectValue: {
        accessKeyId: SecretValue.unsafePlainText(accessKey.accessKeyId),
        accessKeySecret: accessKey.secretAccessKey,
        bucketName: SecretValue.unsafePlainText(bucket.bucketName),
      },
    });

    new StringParameter(scope, "DocumentBucketDetails", {
      parameterName: `/${props.appName}/${props.workspace}/S3_DOCUMENT_BUCKET_SECRET_DETAILS`,
      stringValue: secret.secretArn,
      tier: ParameterTier.STANDARD,
    });
  }

  static lookupSSMDeployTime(scope: Construct, key: string, props: TruckOSApplicationProps) {
    return StringParameter.valueForStringParameter(scope, `/${props.appName}/${props.workspace}/${key}`);
  }

  static createTruckOsDatabase(scope: Construct, vpc: IVpc, props: TruckOSApplicationProps) {
    const dbUsername = "roqone";
    const defaultDB = "roqone";

    const credentials = Credentials.fromGeneratedSecret(dbUsername, {
      excludeCharacters: '."@/\\^',
    });

    const securityGroup = new SecurityGroup(scope, "DBSecurityGroup", {
      vpc,
    });
    securityGroup.addIngressRule(securityGroup, Port.allTcp());

    const cluster = new DatabaseCluster(scope, "Database", {
      instanceProps: {
        vpc: vpc,
        vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [securityGroup],
        instanceType: new InstanceType("serverless"),
      },
      engine: DatabaseClusterEngine.auroraPostgres({
        version: AuroraPostgresEngineVersion.VER_13_7,
      }),
      credentials: credentials,
      defaultDatabaseName: defaultDB,
      iamAuthentication: true,
      removalPolicy: RemovalPolicy.SNAPSHOT,
    });

    // Use the escape hatch as there isn't a L2 abstraction yet for V2 serverless aurora clusters
    Aspects.of(cluster).add({
      visit(node) {
        if (node instanceof CfnDBCluster) {
          node.serverlessV2ScalingConfiguration = {
            minCapacity: 0.5,
            maxCapacity: 2,
          };
        }
      },
    });
    if (!cluster.secret) {
      throw new Error("expected an RDS cluster secret to contain credentials");
    }

    new SecretRotation(scope, "SecretRotation", {
      application: SecretRotationApplication.POSTGRES_ROTATION_SINGLE_USER,
      secret: cluster.secret,
      target: cluster,
      vpc: vpc,
      excludeCharacters: '."@/\\^',
    });

    const proxy = new DatabaseProxy(scope, "RDSProxy", {
      proxyTarget: ProxyTarget.fromCluster(cluster),
      secrets: [cluster.secret],
      vpc,
      securityGroups: [securityGroup],
    });

    new StringParameter(scope, "RDSSecretSSM", {
      parameterName: `/${props.appName}/${props.workspace}/RDS_CLUSTER_SECRET_ARN`,
      stringValue: cluster.secret?.secretArn ?? "",
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(scope, "RDSMasterHostnameSSM", {
      parameterName: `/${props.appName}/${props.workspace}/RDS_MASTER_HOSTNAME`,
      stringValue: cluster.clusterEndpoint.hostname,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(scope, "RDSMasterPortSSM", {
      parameterName: `/${props.appName}/${props.workspace}/RDS_MASTER_PORT`,
      stringValue: String(cluster.clusterEndpoint.port),
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(scope, "RDSReadonlyHostnameSSM", {
      parameterName: `/${props.appName}/${props.workspace}/RDS_READONLY_HOSTNAME`,
      stringValue: cluster.clusterReadEndpoint.hostname,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(scope, "RDSReadonlyPortSSM", {
      parameterName: `/${props.appName}/${props.workspace}/RDS_READONLY_PORT`,
      stringValue: String(cluster.clusterReadEndpoint.port),
      tier: ParameterTier.STANDARD,
    });

    const socketAddr = cluster.clusterEndpoint.socketAddress;
    return {
      cluster: cluster,
      dbUsername: dbUsername,
      socketAddr: socketAddr,
      defaultDB: defaultDB,
      credentials: credentials,
      securityGroup: securityGroup,
      proxy: proxy,
    };
  }
}
