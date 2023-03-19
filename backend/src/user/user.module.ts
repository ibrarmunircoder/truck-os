import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { camelCase } from 'lodash';
import { EntityListenerModule } from 'src/entityListener';
import { LibraryModule } from 'src/library';
import { UserEntity, UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoader, UserLoginHistoryLoader, UserUserLoginHistoryLoader } from 'src/user/loaders';
import { UserLoginHistoryRepository, UserRepository } from 'src/user/repositories';
import { UserLoginHistoryService, UserService } from 'src/user/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository, UserLoginHistoryEntity, UserLoginHistoryRepository]),
    LibraryModule,
    EntityListenerModule.registerAsync([
      {
        name: UserEntity.name,
        useFactory: (configService: ConfigService) => ({
          entity: UserEntity,
          excludedFields: configService.get(`application.entityListener.excludedFields.${camelCase(UserEntity.name)}`),
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [UserService, UserLoader, UserLoginHistoryService, UserLoginHistoryLoader, UserUserLoginHistoryLoader],
  exports: [TypeOrmModule, UserService, UserLoginHistoryService],
  controllers: [],
})
export class UserModule {}
