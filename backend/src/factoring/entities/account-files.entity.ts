/* eslint-disable @typescript-eslint/naming-convention */
import { applicationConfig, s3Factory } from 'src/config';
import { AccountEntity } from 'src/factoring/entities';
import { AccountFileEnum } from 'src/factoring/enums';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import {
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'account_files' })
export class AccountFilesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  key?: string;

  @Column({ nullable: true, type: 'varchar' })
  name?: string;

  @Column({ nullable: true, type: 'varchar' })
  contentType?: string;

  @Column({ nullable: true, type: 'enum', enum: Object.values(AccountFileEnum) })
  fileCategory?: AccountFileEnum;

  @Column({ nullable: true })
  accountId?: string;

  @ManyToOne(() => AccountEntity, (account) => account.files, { nullable: false, cascade: ['soft-remove'] })
  account: AccountEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeRemove()
  async deleteS3Object(): Promise<void> {
    try {
      const s3 = s3Factory();
      const appConfig = applicationConfig();
      await s3
        .deleteObject({
          Bucket: appConfig.awsS3bucketName,
          Key: this.key,
        })
        .promise();
    } catch (err) {
      const logger = new Logger();
      logger.error({
        type: LoggingTypeEnum.error,
        message: err.message,
        stack: err,
      });
      console.error(err);
    }
  }

  get getSignedURL(): string {
    const s3 = s3Factory();
    const appConfig = applicationConfig();
    return s3.getSignedUrl('getObject', {
      Bucket: appConfig.awsS3bucketName,
      Key: this.key,
    });
  }
}
