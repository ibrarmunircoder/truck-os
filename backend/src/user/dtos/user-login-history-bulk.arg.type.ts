import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { BaseArgType } from 'src/library/argTypes';
import {
  UserLoginHistoryFilterArgType,
  UserLoginHistoryOrderArgType,
  UserLoginHistorySearchArgType,
} from 'src/user/dtos';

@ArgsType()
export class UserLoginHistoryBulkArgType extends BaseArgType {
  @Field(() => UserLoginHistorySearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserLoginHistorySearchArgType)
  search?: UserLoginHistorySearchArgType;

  @Field(() => UserLoginHistoryOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserLoginHistoryOrderArgType)
  order?: UserLoginHistoryOrderArgType;

  @Field(() => UserLoginHistoryFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => UserLoginHistoryFilterArgType)
  filter?: UserLoginHistoryFilterArgType;
}
