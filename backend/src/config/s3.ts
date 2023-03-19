import * as S3 from 'aws-sdk/clients/s3';
import { applicationConfig } from 'src/config';

let s3;

export const s3Factory = (): S3 => {
  if (!s3) {
    const config = applicationConfig();
    s3 = new S3({
      credentials: {
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
      },
    });
  }
  return s3;
};
