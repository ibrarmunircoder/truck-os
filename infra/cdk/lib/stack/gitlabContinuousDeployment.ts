import { Construct } from "constructs";
import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { TruckOSApplicationProps } from "./truckOSApplication";
import { AccessKey, PolicyStatement, User } from "aws-cdk-lib/aws-iam";
import { ImageRepositoryStack } from "./imageRepositories";
import { ParameterTier, StringParameter } from "aws-cdk-lib/aws-ssm";
import { GitlabRunnerAutoscaling, GitlabRunnerAutoscalingProps } from "cdk-gitlab-runner";
import {TruckOSNetworkStack} from "./truckOSNetwork";

interface GitlabContinuousDeploymentProps extends TruckOSApplicationProps {
  imageRepos: ImageRepositoryStack;
  network?: TruckOSNetworkStack;
  gitlab?: { minCapacity: number; maxCapacity: number };
}

class ClearingCacheGitlabRunner extends GitlabRunnerAutoscaling {
  createUserData(props: GitlabRunnerAutoscalingProps): string[] {
    return super
      .createUserData(props)
      .concat([
        "cat << _EOF_ > /etc/cron.daily/gitlab_runner_clear_cache",
        "#!/bin/sh",
        "/usr/share/gitlab-runner/clear-docker-cache",
        "_EOF_",
        "chmod +x /etc/cron.daily/gitlab_runner_clear_cache",
      ]);
  }
}

export class GitlabContinuousDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: GitlabContinuousDeploymentProps & StackProps) {
    super(scope, id, props);
    Tags.of(this).add("stack", "GitlabContinuousDeployment");
    Tags.of(this).add("workspace", props.workspace);

    const user = new User(this, "ImagePullPushUser");
    const accessKey = new AccessKey(this, "AccessKey", { user });
    props.imageRepos.frontendRepo.grantPullPush(user);
    props.imageRepos.backendRepo.grantPullPush(user);

    user.addToPolicy(
      new PolicyStatement({
        actions: [
          "ecs:DeregisterTaskDefinition",
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:DescribeTasks",
          "ecs:ListTasks",
          "ecs:ListTaskDefinitions",
          "ecs:RegisterTaskDefinition",
          "ecs:StartTask",
          "ecs:StopTask",
          "ecs:UpdateService",
          "iam:PassRole",
        ],
        resources: ["*"],
      })
    );

    if (props.gitlab) {
      const gitlabToken = StringParameter.valueFromLookup(this, `/GITLAB_TOKEN`);

      new ClearingCacheGitlabRunner(this, "GitlabRunner", {
        gitlabToken: gitlabToken,
        instanceType: "t3.large",
        ebsSize: 250,
        vpc: props.network?.vpc,
        minCapacity: props.gitlab.minCapacity,
        maxCapacity: props.gitlab.maxCapacity,
      });
    }

    // We allow any user who has read access to SSM to push/pull to ECR
    // If more access is granted to user, consider moving to Secret Manager (or extracting this via an out-of-band mechanism)
    new StringParameter(this, "GitlabUserAccessKeySSM", {
      parameterName: `/${props.appName}/${props.workspace}/GITLAB_USER_ACCESS_KEY_ID`,
      stringValue: accessKey.accessKeyId,
      tier: ParameterTier.STANDARD,
    });
    new StringParameter(this, "GitlabUserSecretKeySSM", {
      parameterName: `/${props.appName}/${props.workspace}/GITLAB_USER_SECRET_ACCESS_KEY`,
      stringValue: accessKey.secretAccessKey.unsafeUnwrap(),
      tier: ParameterTier.STANDARD,
    });
  }
}
