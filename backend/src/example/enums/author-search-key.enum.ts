import { registerEnumType } from '@nestjs/graphql';

export enum AuthorSearchKeyEnum {
  NAME = 'name',
  SURNAME = 'surname',
  EMAIL = 'email',
}

registerEnumType(AuthorSearchKeyEnum, {
  name: 'AuthorSearchKeyEnum',
});
