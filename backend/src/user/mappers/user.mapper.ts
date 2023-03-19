import { plainToClass } from 'class-transformer';
import { UserEntity } from 'src/user/entities';
import { UserModel } from 'src/user/models';

export function mapUserToModel(userEntity: UserEntity): UserModel {
  const userModel = plainToClass(UserModel, userEntity);
  return userModel;
}
