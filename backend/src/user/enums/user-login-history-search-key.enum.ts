import { registerEnumType } from '@nestjs/graphql';

export enum UserLoginHistorySearchKeyEnum {
  IP = 'ip',
  HOST = 'host',
}

registerEnumType(UserLoginHistorySearchKeyEnum, {
  name: 'UserLoginHistorySearchKeyEnum',
});
