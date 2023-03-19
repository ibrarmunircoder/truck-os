import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { BookOrderSortEnum } from 'src/example/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class BookOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => BookOrderSortEnum)
  @IsDefined()
  @IsEnum(BookOrderSortEnum)
  sort: BookOrderSortEnum;
}
