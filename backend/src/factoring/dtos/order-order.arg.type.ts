import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { OrderOrderSortEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class OrderOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => OrderOrderSortEnum)
  @IsDefined()
  @IsEnum(OrderOrderSortEnum)
  sort: OrderOrderSortEnum;
}
