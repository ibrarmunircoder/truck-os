import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from 'src';
import { getEnvVars } from 'src/library/utilities';
import { createLogger, LoggerExceptionFilter } from 'src/logger';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  if (configService.get('application.newrelic')) {
    void import('newrelic');
  }
  app.useLogger(createLogger(configService));
  const showDocs = configService.get('application.enableDocs');
  if (showDocs) {
    app.useStaticAssets(join(__dirname, '..', 'docs'), {
      prefix: '/docs/',
    });
  }
  const { httpAdapter } = app.get(HttpAdapterHost);
  const logger = app.get(Logger);
  app.useGlobalFilters(new LoggerExceptionFilter(logger, httpAdapter));
  app.enableCors({ origin: true });
  await app.listen(port);
  if (configService.get('application.debug')) {
    logger.log({
      type: LoggingTypeEnum.system,
      data: { envs: getEnvVars() },
      message: `${configService.get('application.appName')} debug`,
    });
  }
  logger.log({ message: `Started server on port ${port}`, type: LoggingTypeEnum.system });
}
void bootstrap();
