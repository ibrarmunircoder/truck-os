import { registerEnumType } from '@nestjs/graphql';

export enum BookSearchKeyEnum {
  TITLE = 'title',
}

registerEnumType(BookSearchKeyEnum, {
  name: 'BookSearchKeyEnum',
});
