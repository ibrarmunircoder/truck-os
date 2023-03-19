import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import * as _ from 'lodash';
import { AvatarFindQueryInterface } from 'src/userInternal/interfaces';
import { UserFileModel } from 'src/userInternal/models';
import { UserInternalService } from 'src/userInternal/services';

@Injectable()
export class UserInternalAvatarLoader implements NestDataLoader<AvatarFindQueryInterface, UserFileModel> {
  constructor(private readonly userInternalService: UserInternalService) { }
  generateDataLoader(): DataLoader<AvatarFindQueryInterface, UserFileModel> {
    return new DataLoader<AvatarFindQueryInterface, UserFileModel>(async (keys: AvatarFindQueryInterface[]) => {
      const entityIdentifiers = _.compact(keys.map((key) => key.roqIdentifier), undefined);
      const result = entityIdentifiers?.length ? await this.userInternalService.getAvatars(entityIdentifiers) : [];
      return keys.map((key) => result?.find((file) =>
        file.fileAssociations.data.some((f) => f.entityIdentifier === key.roqIdentifier)
      ));
    });
  }
}
