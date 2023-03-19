import { Construct } from "constructs";
import { Duration, RemovalPolicy, Stack, StackProps, Tags } from "aws-cdk-lib";
import { IRepository, Repository, TagStatus } from "aws-cdk-lib/aws-ecr";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";

export class ImageRepositoryStack extends Stack {
  public readonly frontendRepo: IRepository;
  public readonly backendRepo: IRepository;
  constructor(scope: Construct, id: string, props: TruckOSApplicationProps & StackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "ImageRepository");
    Tags.of(this).add("workspace", props.workspace);

    this.frontendRepo = new Repository(this, "frontend", {
      repositoryName: `frontend.${props.workspace}.${props.appName}`,
      lifecycleRules: [
        {
          rulePriority: 2,
          tagStatus: TagStatus.ANY,
          maxImageCount: 10, // Images are ephemeral ; they can always be regenerated from the codebase. No need to keep around an infinite list of them
        },
        {
          rulePriority: 1,
          tagStatus: TagStatus.UNTAGGED,
          maxImageAge: Duration.days(1), // very few untagged images should exist. These should only be created by having an incomplete build action ; drop them after a day
        },
      ],
    });
    this.backendRepo = new Repository(this, "backend", {
      repositoryName: `backend.${props.workspace}.${props.appName}`,
      lifecycleRules: [
        {
          rulePriority: 2,
          tagStatus: TagStatus.ANY,
          maxImageCount: 10, // Images are ephemeral ; they can always be regenerated from the codebase. No need to keep around an infinite list of them
        },
        {
          rulePriority: 1,
          tagStatus: TagStatus.UNTAGGED,
          maxImageAge: Duration.days(1), // very few untagged images should exist. These should only be created by having an incomplete build action ; drop them after a day
        },
      ],
    });
    new StringParameter(this, "FrontendImageRepoUriSSM", {
      parameterName: `/${props.appName}/${props.workspace}/FRONTEND_IMAGE_REPO_URI`,
      stringValue: this.frontendRepo.repositoryUri,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "BackendImageRepoUriSSM", {
      parameterName: `/${props.appName}/${props.workspace}/BACKEND_IMAGE_REPO_URI`,
      stringValue: this.backendRepo.repositoryUri,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "FrontendImageRepoNameSSM", {
      parameterName: `/${props.appName}/${props.workspace}/FRONTEND_IMAGE_REPO_NAME`,
      stringValue: this.frontendRepo.repositoryName,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "BackendImageRepoNameSSM", {
      parameterName: `/${props.appName}/${props.workspace}/BACKEND_IMAGE_REPO_NAME`,
      stringValue: this.backendRepo.repositoryName,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "AwsAccountIdSSM", {
      parameterName: `/${props.appName}/${props.workspace}/AWS_ACCOUNT_ID`,
      stringValue: this.account,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "AwsRegionSSM", {
      parameterName: `/${props.appName}/${props.workspace}/AWS_REGION`,
      stringValue: this.region,
      tier: ParameterTier.STANDARD,
    });

    // Image Repos are by default kept when we drop the stack. However these can be rebuilt from source if we really want them back
    // Hence if we're destroying the environment, also drop all images / registries. Makes it cleaner to create an ephemeral environment.
    this.frontendRepo.applyRemovalPolicy(RemovalPolicy.DESTROY);
    this.backendRepo.applyRemovalPolicy(RemovalPolicy.DESTROY);
  }
}
