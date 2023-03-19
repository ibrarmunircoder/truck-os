// import {Stack, StackProps, Tags} from "aws-cdk-lib";
// import {Construct} from "constructs";
// import {ParameterTier, StringParameter} from "aws-cdk-lib/aws-ssm";
//
import { Duration, RemovalPolicy, Stack, StackProps, Tags } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";
import { Cluster, ContainerImage, FargateService, FargateTaskDefinition, LogDriver } from "aws-cdk-lib/aws-ecs";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import {
  ApplicationLoadBalancer,
  ApplicationProtocol,
  ListenerAction,
  ListenerCertificate,
  ListenerCondition,
  SslPolicy,
} from "aws-cdk-lib/aws-elasticloadbalancingv2";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { LoadBalancerTarget } from "aws-cdk-lib/aws-route53-targets";
import { TruckOSDataStack } from "./truckOSData";
import { Secret } from "aws-cdk-lib/aws-ecs";
import { Secret as smSecret } from "aws-cdk-lib/aws-secretsmanager";

export interface TruckOSApplicationProps {
  appName: string; // e.g. "truckos"
  workspace: string; // e.g. "dev", "staging", "prod
  stateAssetRemovalPolicy?: RemovalPolicy;
}

export interface TruckOSComputeProps {
  dataStack: TruckOSDataStack;
  apps: {
    frontendReplicaCount: number;
    backendReplicaCount: number;
  };
}

export class TruckOSApplicationStack extends Stack {
  private props: TruckOSApplicationProps & TruckOSComputeProps & StackProps;
  constructor(scope: Construct, id: string, props: TruckOSApplicationProps & TruckOSComputeProps & StackProps) {
    super(scope, id, props);
    this.props = props;
    Tags.of(this).add("stack", "TruckOSApplication");
    Tags.of(this).add("workspace", props.workspace);

    const vpcID = this.lookupSSMSynthTime("VPC_ID");

    const vpc = Vpc.fromLookup(this, "TruckOSVPC", {
      vpcId: vpcID,
    });

    const cluster = new Cluster(this, "Cluster", {
      vpc,
      enableFargateCapacityProviders: true,
    });

    const hostedZoneId = this.lookupSSMDeployTime("HOSTED_ZONE_ID");
    const hostedZoneName = this.lookupSSMDeployTime("HOSTED_ZONE_NAME");
    const hostedZone = HostedZone.fromHostedZoneAttributes(this, "HostedZone", {
      hostedZoneId,
      zoneName: hostedZoneName,
    });

    const certificateArn = this.lookupSSMDeployTime("CERTIFICATE_ARN");
    const certificate = Certificate.fromCertificateArn(this, "Certificate", certificateArn);

    const frontendImageRepoARN = this.lookupSSMDeployTime("FRONTEND_IMAGE_REPO_NAME");
    const frontendImageRepo = Repository.fromRepositoryName(this, "FrontendImageRepo", frontendImageRepoARN);
    const backendImageRepoARN = this.lookupSSMDeployTime("BACKEND_IMAGE_REPO_NAME");
    const backendImageRepo = Repository.fromRepositoryName(this, "BackendImageRepo", backendImageRepoARN);

    const frontendTaskRole = new Role(this, "TaskRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
    });
    const backendTaskRole = new Role(this, "BackendTaskRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
    });

    const backendServiceSecurityGroup = new SecurityGroup(this, "BackendServiceSecurityGroup", { vpc });

    const dbSecurityGroup = SecurityGroup.fromSecurityGroupId(
      this,
      "DBSecurityGroup",
      props.dataStack.securityGroup.securityGroupId
    );

    dbSecurityGroup.addIngressRule(
      backendServiceSecurityGroup,
      Port.tcp(5432),
      "Allow backend service to access database"
    );

    const proxy = props.dataStack.proxy;
    proxy.grantConnect(backendTaskRole);

    [frontendTaskRole, backendTaskRole].forEach((role) =>
      role.addManagedPolicy({
        managedPolicyArn: "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
      })
    );
    // for ecs exec so we can debug when something goes wrong
    [frontendTaskRole, backendTaskRole].forEach((role) =>
      role.addToPolicy(
        new PolicyStatement({
          actions: [
            "ssm:UpdateInstanceInformation",
            "ssmmessages:CreateControlChannel",
            "ssmmessages:CreateDataChannel",
            "ssmmessages:OpenControlChannel",
            "ssmmessages:OpenDataChannel",
            "s3:GetEncryptionConfiguration",
          ],
          resources: ["*"],
        })
      )
    );

    const truckOSFrontendTaskDefinition = new FargateTaskDefinition(this, "TruckOSFrontendTask", {
      memoryLimitMiB: 2048,
      cpu: 512,
      taskRole: frontendTaskRole,
      family: "truckos-frontend",
    });

    truckOSFrontendTaskDefinition.addContainer("FrontendContainer", {
      image: ContainerImage.fromEcrRepository(frontendImageRepo, "latest"),
      environment: {
        PORT: "3200",
        NEXTAUTH_URL: `https://${hostedZoneName}`,
        NEXT_PUBLIC_BACKEND_URL: `https://${hostedZoneName}`,

        API_KEY: this.lookupSSMDeployTime("API_KEY"),
        APP_ENVIRONMENT: this.lookupSSMDeployTime("APP_ENVIRONMENT"),
        BACKEND_API_KEY: this.lookupSSMDeployTime("BACKEND_API_KEY"),
        NAMESPACE: this.lookupSSMDeployTime("NAMESPACE"),
        NEXT_PUBLIC_LOCALE_DEFAULT: this.lookupSSMDeployTime("NEXT_PUBLIC_LOCALE_DEFAULT"),
        NEXT_PUBLIC_PLATFORM_HOST: this.lookupSSMDeployTime("NEXT_PUBLIC_PLATFORM_HOST"),
        NEXT_PUBLIC_PLATFORM_URL: this.lookupSSMDeployTime("NEXT_PUBLIC_PLATFORM_URL"),
        NEXT_PUBLIC_SOCKET_BACKEND_URL: this.lookupSSMDeployTime("NEXT_PUBLIC_SOCKET_BACKEND_URL"),
        NEXT_PUBLIC_SOCKET_PLATFORM_URL: this.lookupSSMDeployTime("NEXT_PUBLIC_SOCKET_PLATFORM_URL"),
        NODE_ENVIRONMENT: this.lookupSSMDeployTime("NODE_ENVIRONMENT"),
        TENANT_ID: this.lookupSSMDeployTime("TENANT_ID"),
        NODE_ENV: this.lookupSSMDeployTime("NODE_ENV"),
        //
        // TRANSLATION_LOAD_CHUNK_SIZE: "",
      },
      portMappings: [
        {
          containerPort: 3200,
          hostPort: 3200,
        },
      ],
      healthCheck: {
        command: ["CMD-SHELL", "curl --fail --insecure http://localhost:3200 || exit 1"],
        startPeriod: Duration.seconds(30),
        timeout: Duration.seconds(30),
      },
      user: "nextjs",
      privileged: false,
      logging: LogDriver.awsLogs({
        logGroup: props.dataStack.frontendLogGroup,
        streamPrefix: "frontend",
      }),
    });

    const truckOSBackendTaskDefinition = new FargateTaskDefinition(this, "TruckOSBackendTask", {
      memoryLimitMiB: 2048,
      cpu: 512,
      taskRole: backendTaskRole,
      family: "truckos-backend",
    });

    const secret = props.dataStack.cluster.secret;
    if (!secret) {
      throw new Error("expected a cluster secret");
    }

    const secretArn = this.lookupSSMDeployTime("S3_DOCUMENT_BUCKET_SECRET_DETAILS");
    const bucketSecretDetails = smSecret.fromSecretCompleteArn(this, "DocumentBucketDetails", secretArn);

    const connectionString = `postgres://${props.dataStack.credentials.username}:${secret.secretValueFromJson(
      "password"
    )}@${props.dataStack.proxy.endpoint}/${props.dataStack.defaultDB}?sslmode=require`;

    truckOSBackendTaskDefinition.addContainer("BackendContainer", {
      image: ContainerImage.fromEcrRepository(backendImageRepo, "latest"),
      environment: {
        PORT: "3100",
        FRONTEND_URL: `https://${hostedZoneName}`,
        DATABASE_ENDPOINT: props.dataStack.proxy.endpoint,
        DATABASE_NAME: props.dataStack.defaultDB,

        API_KEY: this.lookupSSMDeployTime("API_KEY"),
        APP_ENVIRONMENT: this.lookupSSMDeployTime("APP_ENVIRONMENT"),
        CLOUD_LOGS_NAME: this.lookupSSMDeployTime("CLOUD_LOGS_NAME"),
        DEFAULT_LANGUAGE: this.lookupSSMDeployTime("DEFAULT_LANGUAGE"),
        ENABLE_DOCS: this.lookupSSMDeployTime("ENABLE_DOCS"),
        ENVIRONMENT: this.lookupSSMDeployTime("ENVIRONMENT"),
        JWT_SECRET: this.lookupSSMDeployTime("JWT_SECRET"),
        JWT_TTL: this.lookupSSMDeployTime("JWT_TTL"),
        NEXT_PUBLIC_PLATFORM_URL: this.lookupSSMDeployTime("NEXT_PUBLIC_PLATFORM_URL"),
        NODE_ENVIRONMENT: this.lookupSSMDeployTime("NODE_ENVIRONMENT"),
        ROQ_PLATFORM_HOST: this.lookupSSMDeployTime("ROQ_PLATFORM_HOST"),
        ROQ_PLATFORM_URL: this.lookupSSMDeployTime("ROQ_PLATFORM_URL"),
        TENANT_ID: this.lookupSSMDeployTime("TENANT_ID"),
        WALBING_BASE_URL: this.lookupSSMDeployTime("WALBING_BASE_URL"),
        WALBING_WEBHOOK_SECRET_KEY: this.lookupSSMDeployTime("WALBING_WEBHOOK_SECRET_KEY"),
        AWS_S3_SIGNED_URL_EXPIRE: "10",
      },
      portMappings: [
        {
          containerPort: 3100,
          hostPort: 3100,
        },
      ],
      secrets: {
        DATABASE_USERNAME: Secret.fromSecretsManager(secret, "username"),
        DATABASE_PASSWORD: Secret.fromSecretsManager(secret, "password"),
        AWS_ACCESS_KEY_ID: Secret.fromSecretsManager(bucketSecretDetails, "accessKeyId"),
        AWS_SECRET_ACCESS_KEY: Secret.fromSecretsManager(bucketSecretDetails, "accessKeySecret"),
        AWS_S3_BUCKET_NAME: Secret.fromSecretsManager(bucketSecretDetails, "bucketName"),
      },
      healthCheck: {
        command: ["CMD-SHELL", "curl --fail --insecure http://localhost:3100/health || exit 1"],
        startPeriod: Duration.seconds(30),
        timeout: Duration.seconds(30),
      },
      privileged: false,
      logging: LogDriver.awsLogs({
        logGroup: props.dataStack.backendLogGroup,
        streamPrefix: "backend",
      }),
    });

    const backendService = new FargateService(this, "BackendService", {
      taskDefinition: truckOSBackendTaskDefinition,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [backendServiceSecurityGroup],
      cluster: cluster,
      enableExecuteCommand: true,
      desiredCount: props.apps.backendReplicaCount,
      serviceName: `backend-${props.workspace}-${props.appName}`,
    });
    backendService.applyRemovalPolicy(RemovalPolicy.DESTROY);

    const frontendService = new FargateService(this, "FrontendService", {
      taskDefinition: truckOSFrontendTaskDefinition,
      vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [],
      cluster: cluster,
      enableExecuteCommand: true,
      desiredCount: props.apps.frontendReplicaCount,
      serviceName: `frontend-${props.workspace}-${props.appName}`,
    });
    frontendService.applyRemovalPolicy(RemovalPolicy.DESTROY);

    const lb = new ApplicationLoadBalancer(this, "LB", {
      vpc: cluster.vpc,
      internetFacing: true,
      idleTimeout: Duration.seconds(120),
    });

    const listener = lb.addListener("HTTPSListener", {
      protocol: ApplicationProtocol.HTTPS,
      certificates: [ListenerCertificate.fromCertificateManager(certificate)],
      port: 443,
      open: true,
      sslPolicy: SslPolicy.RECOMMENDED,
    });

    lb.addListener("PublicRedirectListener", {
      protocol: ApplicationProtocol.HTTP,
      port: 80,
      open: true,
      defaultAction: ListenerAction.redirect({
        port: "443",
        protocol: ApplicationProtocol.HTTPS,
        permanent: true,
      }),
    });

    const frontendTargetGroup = listener.addTargets("FrontendTargetGroup", {
      targetGroupName: `frontend-${props.workspace}-${props.appName}`,
      protocol: ApplicationProtocol.HTTP,
      port: 3200,
    });

    frontendTargetGroup.addTarget(frontendService);

    const backendTargetGroup = listener.addTargets("BackendTargetGroup", {
      targetGroupName: `backend-${props.workspace}-${props.appName}`,
      protocol: ApplicationProtocol.HTTP,
      port: 3100,
      priority: 5,
      healthCheck: {
        path: "/health",
      },
      conditions: [ListenerCondition.pathPatterns(["/graphql", "/webhook/walbing/*"])],
    });

    backendTargetGroup.addTarget(backendService);

    new ARecord(this, "LbAliasDns", {
      zone: hostedZone,
      recordName: hostedZoneName,
      target: RecordTarget.fromAlias(new LoadBalancerTarget(lb)),
    });

    new StringParameter(this, `ClusterName`, {
      parameterName: `/${props.appName}/${props.workspace}/AWS_ECS_CLUSTER_NAME`,
      stringValue: cluster.clusterName,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, `DatabaseSSM`, {
      parameterName: `/${props.appName}/${props.workspace}/DATABASE_URL`,
      stringValue: connectionString,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, `BackendURLSSM`, {
      parameterName: `/${props.appName}/${props.workspace}/NEXT_PUBLIC_BACKEND_URL`,
      stringValue: `https://${hostedZoneName}`,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, `FrontendServiceName`, {
      parameterName: `/${props.appName}/${props.workspace}/AWS_ECS_FRONTEND_SERVICE_NAME`,
      stringValue: frontendService.serviceName,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, `BackendServiceName`, {
      parameterName: `/${props.appName}/${props.workspace}/AWS_ECS_BACKEND_SERVICE_NAME`,
      stringValue: backendService.serviceName,
      tier: ParameterTier.STANDARD,
    });
  }

  lookupSSMDeployTime(key: string) {
    return StringParameter.valueForStringParameter(this, `/${this.props.appName}/${this.props.workspace}/${key}`);
  }
  lookupSSMSynthTime(key: string) {
    return StringParameter.valueFromLookup(this, `/${this.props.appName}/${this.props.workspace}/${key}`);
  }
}
