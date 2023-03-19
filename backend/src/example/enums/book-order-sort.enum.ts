import { registerEnumType } from '@nestjs/graphql';

export enum BookOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TITLE = 'title',
  PUBLISHING_DATE = 'publishingDate',
  PRICE = 'price',
  DESCRIPTION = 'description',
  PUBLISHED = 'published',
  OUT_OF_STOCK = 'outOfStock',
}

registerEnumType(BookOrderSortEnum, {
  name: 'BookOrderSortEnum',
});
