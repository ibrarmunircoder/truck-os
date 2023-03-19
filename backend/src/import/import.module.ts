import { Module } from '@nestjs/common';
import { ImportConsole } from 'src/import/consoles';
import { ImportService } from 'src/import/services';
import { Logger } from 'src/logger/services';
import { PlatformClientModule } from 'src/platformClient';

@Module({
  imports: [
    PlatformClientModule
  ],
  providers: [ImportConsole, ImportService, Logger],
  exports: [],
  controllers: [],
})
export class ImportModule {}
