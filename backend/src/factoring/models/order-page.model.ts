import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OrderModel } from 'src/factoring/models';

@ObjectType()
export class OrderPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [OrderModel])
  data: OrderModel[];
}
