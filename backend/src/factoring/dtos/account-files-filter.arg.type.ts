import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { BaseFilterArgType, IdFilterArgType, StringFilterArgType } from 'src/library/argTypes';

@InputType()
export class AccountFilesFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  name?: StringFilterArgType;
  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  accountId?: IdFilterArgType;
}
