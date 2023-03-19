import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { OrderFilesFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class OrderFilesBulkArgType {
  @Field(() => OrderFilesFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => OrderFilesFilterArgType)
  filter?: OrderFilesFilterArgType;
}
