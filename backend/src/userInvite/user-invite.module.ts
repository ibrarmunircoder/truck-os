import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { Logger } from 'src/logger/services';
import { PlatformNotificationClientModule } from 'src/platformClient/platformNotificationClient';
import { PlatformUserClientModule } from 'src/platformClient/platformUserClient';
import { UserModule } from 'src/user';
import { UserInviteResolver } from 'src/userInvite/resolvers';
import { UserInviteService } from 'src/userInvite/services';

@Module({
  imports: [AuthModule, UserModule, PlatformUserClientModule, PlatformNotificationClientModule],
  providers: [UserInviteResolver, UserInviteService, Logger],
  exports: [UserInviteService],
})
export class UserInviteModule {}
