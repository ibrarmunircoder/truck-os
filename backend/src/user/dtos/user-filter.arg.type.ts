import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import {
  BaseFilterArgType,
  BooleanFilterArgType,
  DateFilterArgType,
  IdFilterArgType,
  StringFilterArgType,
} from 'src/library/argTypes';

@InputType()
export class UserFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  email?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  phone?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  firstName?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  lastName?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  locale?: StringFilterArgType;

  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  timezone?: StringFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  roqIdentifier?: IdFilterArgType;

  @Field(() => DateFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DateFilterArgType)
  optedInAt?: DateFilterArgType;

  @Field(() => BooleanFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BooleanFilterArgType)
  active?: BooleanFilterArgType;

  @Field(() => BooleanFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BooleanFilterArgType)
  sync?: BooleanFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  userLoginHistoryId?: IdFilterArgType;
}
