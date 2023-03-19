import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { AccountFilterArgType, AccountOrderArgType, AccountSearchArgType } from 'src/factoring/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class AccountArgType extends BaseArgType {
  @Field(() => AccountSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountSearchArgType)
  search?: AccountSearchArgType;

  @Field(() => AccountOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountOrderArgType)
  order?: AccountOrderArgType;

  @Field(() => AccountFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => AccountFilterArgType)
  filter?: AccountFilterArgType;
}
