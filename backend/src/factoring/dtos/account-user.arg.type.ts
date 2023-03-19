import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AccountUserFilterArgType, AccountUserOrderArgType, AccountUserSearchArgType } from 'src/factoring/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class AccountUserArgType extends BaseArgType {
  @Field(() => AccountUserSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountUserSearchArgType)
  search?: AccountUserSearchArgType;

  @Field(() => AccountUserOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountUserOrderArgType)
  order?: AccountUserOrderArgType;

  @Field(() => AccountUserFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountUserFilterArgType)
  filter?: AccountUserFilterArgType;
}
