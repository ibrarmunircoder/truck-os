import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AccountUserFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class AccountUserBulkArgType {
  @Field(() => AccountUserFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountUserFilterArgType)
  filter?: AccountUserFilterArgType;
}
