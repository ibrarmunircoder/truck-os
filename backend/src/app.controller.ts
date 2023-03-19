/* eslint-disable @roq/filename-suffix-mismatch */

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  health(): void {
    return;
  }
}
