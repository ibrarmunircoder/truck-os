import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AccountFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class AccountBulkArgType {
  @Field(() => AccountFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountFilterArgType)
  filter?: AccountFilterArgType;
}
