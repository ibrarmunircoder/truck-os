import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver, SessionResolver } from 'src/auth/resolvers';
import { AuthService } from 'src/auth/services';
import { ApiKeyStrategy, JwtRefreshStrategy, JwtStrategy } from 'src/auth/strategies';
import { EventModule } from 'src/event';
import { Logger } from 'src/logger/services';
import { PlatformClientModule } from 'src/platformClient';
import { PlatformMailClientModule } from 'src/platformClient/platformMailClient';
import { PlatformUserClientModule } from 'src/platformClient/platformUserClient';
import { UserModule } from 'src/user';
import { FactoringModule } from 'src/factoring';

@Module({
  imports: [
    EventModule,
    JwtModule.register({}),
    PassportModule,
    PlatformClientModule,
    PlatformUserClientModule,
    PlatformMailClientModule,
    UserModule,
    forwardRef(() => FactoringModule),
  ],
  providers: [AuthService, AuthResolver, ApiKeyStrategy, JwtStrategy, JwtRefreshStrategy, SessionResolver, Logger],
  exports: [AuthService],
})
export class AuthModule {}
