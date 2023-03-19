/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { InjectS3, S3 } from 'nestjs-s3';
import { JwtAuthGuard } from 'src/auth/guards';
import { applicationConfig } from 'src/config';

@Resolver(() => String)
export class S3Resolver {
  constructor(
    @InjectS3() private readonly s3: S3,
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ConfigType<typeof applicationConfig>,
  ) {}

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createStorageUrl(@Args({ name: 'key', type: () => String }) key: string): Promise<string> {
    const params = {
      Bucket: this.appConfig.awsS3bucketName,
      Key: key,
      Expires: this.appConfig.awsS3SignedUrlExpire,
      ContentType: 'application/pdf',
      ACL: 'private',
    };
    return this.s3.getSignedUrlPromise('putObject', {
      ...params,
    });
  }
}
