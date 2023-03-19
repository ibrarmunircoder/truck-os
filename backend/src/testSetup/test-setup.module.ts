/* eslint-disable @roq/filename-suffix-mismatch */
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { TestSetupController } from 'src/testSetup/controllers';
import { UserModule } from 'src/user';

@Module({
  imports: [UserModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [TestSetupController],
})
export class TestSetupModule {}
