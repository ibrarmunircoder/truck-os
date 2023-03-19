import { cloneDeep } from '@apollo/client/utilities';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEqual } from 'lodash';
import { EventNameEnum } from 'src/event/enums';
import { EventInterface } from 'src/event/interfaces';
import { EventTriggerService } from 'src/event/services';
import { LoggingTypeEnum } from 'src/logger/enums';
import { Logger } from 'src/logger/services';
import { UserEntity } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';
import { UserService } from 'src/user/services';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';

@EventSubscriber()
export class UserInternalListener implements EntitySubscriberInterface<UserEntity> {
  constructor(
    @Inject(EventTriggerService) private eventTriggerService: EventTriggerService,
    @Inject(UserService) private userService: UserService,
    private logger: Logger,
    @InjectRepository(UserRepository) private userRepositories: UserRepository,
    connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof UserEntity {
    return UserEntity;
  }

  async afterUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    if (event && event.entity && !isEqual(event.entity, { sync: true })) {
      //ROQ Platform User sync
      const platformSync = () => {
        const clonedUser = cloneDeep(event.entity);
        delete clonedUser.password;
        clonedUser.id = clonedUser.roqIdentifier;
        const userUpdatedEventData: Partial<UserEntity> = clonedUser;

        const userUpdatedEvent: EventInterface = {
          id: event.entity.id,
          name: EventNameEnum.USER_LOGIN_SYNC,
          object: 'UserLoginEntity',
          data: userUpdatedEventData,
        };
        void this.eventTriggerService.trigger(userUpdatedEvent);
      };
      await this.syncWrapper(event, platformSync);
    }
  }

  private async syncWrapper(
    event: UpdateEvent<UserEntity> | InsertEvent<UserEntity> | RemoveEvent<UserEntity>,
    sync: () => void,
  ) {
    try {
      sync();
      await event.queryRunner.manager.update(UserEntity, { id: event.entity.id }, { sync: true });
    } catch (exception) {
      this.logger.error(
        {
          message: exception.message,
          type: LoggingTypeEnum.error,
          stack: exception.stack,
        },
        exception.stack,
      );
      await event.queryRunner.manager.update(UserEntity, { id: event.entity.id }, { sync: false });
    }
  }
}
