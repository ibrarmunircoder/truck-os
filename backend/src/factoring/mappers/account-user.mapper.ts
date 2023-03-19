import { plainToClass } from 'class-transformer';
import { AccountUserEntity } from 'src/factoring/entities';
import { AccountUserModel } from 'src/factoring/models';

export function mapAccountUserToModel(accountUserEntity: AccountUserEntity): AccountUserModel {
  const accountUserModel = plainToClass(AccountUserModel, accountUserEntity);
  return accountUserModel;
}
