import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { OrderFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class OrderBulkArgType {
  @Field(() => OrderFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => OrderFilterArgType)
  filter?: OrderFilterArgType;
}
