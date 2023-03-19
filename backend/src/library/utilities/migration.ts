// eslint-disable-next-line @roq/filename-suffix-mismatch
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { validationSchema } from 'src/config';

void (async () => {
  const config = {
    local: {
      entities: 'src/**/entities/*.ts',
      migrations: 'src/migration/**/*.ts',
      migrationsDir: 'src/migration'
    },
    server: {
      entities: 'dist/src/**/entities/*.js',
      migrations: 'dist/src/migration/**/*.js',
      migrationsDir: 'dist/src/migration'
    }
  };
  const environment = process.argv[process.argv.length - 1];
  const path = './ormconfig.json';

  dotenv.config({ path: `${__dirname}/../.env` });

  const validatedConfig = await validationSchema.validateAsync({
    DATABASE_URL: process.env.DATABASE_URL
  });

  writeFileSync(
    path,
    JSON.stringify(
      {
        type: 'postgres',
        url: validatedConfig.DATABASE_URL,
        logging: true,
        entities: [
          config[environment].entities
        ],
        migrations: [
          config[environment].migrations
        ],
        cli: {
          migrationsDir: config[environment].migrationsDir
        }
      },
      null,
      2
    )
  );
  console.info(`Config for migration has been created: ${path}`);
})();
