import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { OrderFilterArgType, OrderOrderArgType, OrderSearchArgType } from 'src/factoring/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class OrderArgType extends BaseArgType {
  @Field(() => OrderSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => OrderSearchArgType)
  search?: OrderSearchArgType;

  @Field(() => OrderOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => OrderOrderArgType)
  order?: OrderOrderArgType;

  @Field(() => OrderFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => OrderFilterArgType)
  filter?: OrderFilterArgType;
}
