// eslint-disable-next-line @roq/filename-suffix-mismatch
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@roq/nestjs-dataloader';
import { EventModule } from 'src/event';
import { FactoringModule } from 'src/factoring';
import { LibraryModule } from 'src/library';
import { Logger } from 'src/logger/services';
import { PlatformClientModule } from 'src/platformClient';
import { PlatformNotificationClientModule } from 'src/platformClient/platformNotificationClient';
import { PlatformSpaceClientModule } from 'src/platformClient/platformSpaceClient';
import { PlatformUserClientModule } from 'src/platformClient/platformUserClient';
import { UserModule } from 'src/user';
import { UserInternalListener } from 'src/userInternal/listeners';
import { UserInternalAvatarLoader, UserInternalLastLoginActivityLoader } from 'src/userInternal/loaders';
import { UserInternalResolver, UserLoginHistoryInternalResolver } from 'src/userInternal/resolvers';
import { UserInternalCronService, UserInternalService } from 'src/userInternal/services';
import { UserInviteModule } from 'src/userInvite';

@Global()
@Module({
  imports: [
    EventModule,
    LibraryModule,
    UserModule,
    UserInviteModule,
    PlatformSpaceClientModule,
    PlatformClientModule,
    PlatformUserClientModule,
    PlatformNotificationClientModule,
    FactoringModule,
  ],
  providers: [
    Logger,
    UserInternalAvatarLoader,
    UserInternalLastLoginActivityLoader,
    UserInternalListener,
    UserLoginHistoryInternalResolver,
    UserInternalResolver,
    UserInternalService,
    UserInternalCronService,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [UserInternalService],
  controllers: [],
})
export class UserInternalModule {}
