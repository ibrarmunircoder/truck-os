import { ConfigService } from '@nestjs/config';
import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from 'src';
import { createLogger } from 'src/logger';

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
});
bootstrap
  .init()
  .then(async (app) => {
    const configService = app.get(ConfigService);
    app.useLogger(createLogger(configService));
    await app.init();
    await bootstrap.boot();
    process.exit(0);
  })
  .catch(() => process.exit(1));
