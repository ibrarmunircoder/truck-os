import { registerEnumType } from '@nestjs/graphql';

export enum LoginProviderEnum {
  // FACEBOOK = 'facebook',
  APPLE = 'apple',
  GOOGLE = 'google',
  // TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
}

registerEnumType(LoginProviderEnum, {
  name: 'LoginProviderEnum'
});
