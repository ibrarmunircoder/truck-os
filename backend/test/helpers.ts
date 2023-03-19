import { DynamicModule, Type, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ClsModule } from 'nestjs-cls';
import * as path from 'path';
import { applicationConfig, validationSchema } from 'src/config';
import { ImportConsole, ImportModule } from 'src/import';
import { ImportService } from 'src/import/services';
import { Logger } from 'src/logger/services';
import { Connection, getConnection } from 'typeorm';

export const importFixtures = async (connection: Connection): Promise<void> => {
  const logger = new Logger();
  const importer = new ImportConsole(logger, new ImportService(connection, logger), null, null);
  await importer.importEntities(false, connection, '../test/fixtures');
};

export const reinitialize = async (): Promise<void> => {
  const connection = await getConnection();
  return connection.synchronize(true);
};

export const clearAll = async (): Promise<void> => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
  }
};

export const configModules = ({
  configModuleOptions,
  typeOrmModuleOptions,
  gqlModuleOptions,
}: {
  configModuleOptions?: ConfigModuleOptions;
  typeOrmModuleOptions?: TypeOrmModuleAsyncOptions;
  gqlModuleOptions?: GqlModuleOptions;
} = {}): [DynamicModule, DynamicModule, DynamicModule, DynamicModule, DynamicModule, Type] => [
  ConfigModule.forRoot({
    load: [applicationConfig],
    validationSchema,
    envFilePath: path.resolve(__dirname, '../.env.test'),
    isGlobal: true,
    ...(configModuleOptions && configModuleOptions),
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (appConfig) => ({
      type: 'postgres',
      url: appConfig.databaseUrl,
      autoLoadEntities: true,
      logging: false,
      keepConnectionAlive: true,
      synchronize: true,
      extra: {
        queryLimit: appConfig.queryLimit,
        defaultLanguage: appConfig.defaultLanguage,
        collationLocales: appConfig.collationLocales,
      },
      ...(typeOrmModuleOptions && typeOrmModuleOptions),
    }),
    inject: [applicationConfig.KEY],
  }),
  GraphQLModule.forRoot({
    context: ({ req }) => ({ req }),
    autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    debug: true,
    playground: true,
    fieldResolverEnhancers: ['guards'],
    ...(gqlModuleOptions && gqlModuleOptions),
  }),
  ScheduleModule.forRoot(),
  ClsModule.register({
    global: true,
  }),
  ImportModule,
];

export const defaultProviders = [
  {
    provide: APP_PIPE,
    useFactory: (): ValidationPipe => new ValidationPipe({ skipUndefinedProperties: true, stopAtFirstError: true }),
  },
  Logger,
];
