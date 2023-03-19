import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { OrderSearchKeyEnum } from 'src/factoring/enums';

@InputType()
export class OrderSearchArgType {
  @Field(() => OrderSearchKeyEnum)
  @IsDefined()
  @IsEnum(OrderSearchKeyEnum)
  key: OrderSearchKeyEnum;

  @Field()
  value: string;
}
