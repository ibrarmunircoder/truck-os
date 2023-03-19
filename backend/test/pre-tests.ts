import * as dotenv from 'dotenv';
import * as path from 'path';
import { createConnection } from 'typeorm';

void (async () => {
  dotenv.config({ path: `${__dirname}/../.env.test` });
  try {
    await createConnection({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['src/**/*.entity{.ts,.js}'],
      migrations: [
        path.resolve(__dirname, './migration/*{.ts,.js}')
      ],
      dropSchema: true,
      migrationsRun: true,
    });
    console.info('Schema re-created');
  }
  catch (err) {
    console.error('Error while re-creating schema is ', err);
    process.exit(1);
  }
})();
