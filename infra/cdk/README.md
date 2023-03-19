# Quickstart

Assumes an AWS CLI configured to access the root truckOS account (007696334690) via a profile named 007696334690.

Login to AWS, create a new Access Key, and enter the details when prompted when running the following command.

`aws configure --profile 007696334690`

## Bootstrapping sub accounts

CDK should be configured to access sub accounts, however to bootstrap requires configuring an AWS profile for a sub account.

A delegate AWS Profile can be configured to access the sub account via the organization account access role. For example, to access `dev` add the following to your `$HOME/.aws/config` file:

```
[profile 696448812249]
region = eu-west-1
source_profile = 007696334690
role_arn = arn:aws:iam::696448812249:role/OrganizationAccountAccessRole
```

## Syncing .env files (and bringing in secrets)

Secrets are left in AWS ; they are not committed to the repository.

However, to bring them in (e.g. to configure gitlab), execute the `./scripts/sync-environments.ts` script.

## CDK Design Decisions

1) No nested stacks

The "No nested stacks" decision comes from a desire for high maintainability, visibility, and debuggability of CDK applications.

**Maintainability**. By not using nested stacks, resources can be more easily refactored, as the number of stateful resources in each stack is lower. This also forcing the coupling between stacks to be looser. This looser coupling naturally reduces issues like circular dependencies -- if it's already created than it implicitly cannot be circular.

It also means resources deploy faster, as a change affecting only one stack will only cause 1 stack to update. Similarly during development iteration an explicit stack can be passed in for a given changeset.

**Visibility**

If the stacks are deployed via CLI, all stack changes are propagated to the console. If the stack is deployed via a pipeline, 1 stage will map to 1 stack, reducing the amount of resources to understand for any deployment issues.

**Debuggability**

When something goes wrong, using a layer cake approach  minimizes the amount of components to look at when analyzing a fix.

**Trade Off** If multiple stacks need to update for a software upgrade to complete, and a stack fails then the rollback isn't as obvious, as prior stacks are already in a completed state.

In practice, trade off is deemed to be low severity, as any infrastructure issues will almost always be found before the change hits production, assuming appropriate testing.

2) Prefer deploying infrastructure via codepipeline, but always enable manual deployment

3) Break into different CDK app targets to reduce churn
   * `bootstrap.ts` is an infrastructure deployment that will set up some resources that are not expected to ever churn. E.g. a hosted zone to manage DNS records for an environment within. Generally only contains AWS managed resources. Would always be deployed manually  
   * `all.ts` is an infrastructure deployment for all "application infrastructure" resources that are expected to churn on a regular basis for operational and development reasons. (e.g. if compute host RAM size was bumped, a deploy of this would make that change live on a given environment). Would be deployed manually.
   * `ci.ts` is a wrapper for automated infrastructure deployments. Would not be deployed manually (except once, during initial creation). Invoked by CDK Pipelines. 

