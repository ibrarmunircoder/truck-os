import { registerEnumType } from '@nestjs/graphql';

export enum UserSearchKeyEnum {
  PHONE = 'phone',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  LOCALE = 'locale',
  TIMEZONE = 'timezone',
  ROQ_IDENTIFIER = 'roqIdentifier',
}

registerEnumType(UserSearchKeyEnum, {
  name: 'UserSearchKeyEnum',
});
