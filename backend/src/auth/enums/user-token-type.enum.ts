import { registerEnumType } from '@nestjs/graphql';

export enum UserTokenTypeEnum {
  REFRESH = 'refresh',
  RESET_PASSWORD = 'resetPassword',
  VALIDATE_EMAIL = 'validateEmail',
  USER_INVITE = 'userInvite',
}

registerEnumType(UserTokenTypeEnum, {
  name: 'UserTokenTypeEnum',
});
