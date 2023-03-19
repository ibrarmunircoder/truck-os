import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { addSeconds } from 'date-fns';
import { UserRepository } from 'src/user/repositories';

const USER_SYNC_CRON = 'USER_SYNC_CRON';

@Injectable()
export class UserInternalCronService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
  ) {
  }

  onModuleInit(): void {
    this.createUserSyncCron();
  }

  onApplicationShutdown(): void {
    this.deleteUserSyncCron();
  }

  private createUserSyncCron() {
    const job = new CronJob(this.configService.get('application.platform.userSyncCronInterval'), async () => {
      const unsyncUserEntities = await this.userRepository
        .createQueryBuilder('user')
        .andWhere('user.sync = :sync', { sync: false })
        .andWhere('user.updatedAt < :updatedAt', { updatedAt: addSeconds(new Date(), 1) })
        .getMany();
      await this.userRepository.save(
        unsyncUserEntities.map((userEntity) => ({ ...userEntity, sync: true })),
      );
    });

    this.schedulerRegistry.addCronJob(USER_SYNC_CRON, job);
    job.start();
  }

  private deleteUserSyncCron() {
    this.schedulerRegistry.deleteCronJob(USER_SYNC_CRON);
  }
}
