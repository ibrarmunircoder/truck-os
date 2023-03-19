import { plainToClass } from 'class-transformer';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryModel } from 'src/user/models';

export function mapUserLoginHistoryToModel(userLoginHistoryEntity: UserLoginHistoryEntity): UserLoginHistoryModel {
  const userLoginHistoryModel = plainToClass(UserLoginHistoryModel, userLoginHistoryEntity);
  return userLoginHistoryModel;
}
