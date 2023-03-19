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
export class BookFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  title?: StringFilterArgType;
  @Field(() => DateFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DateFilterArgType)
  publishingDate?: DateFilterArgType;
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  description?: StringFilterArgType;
  @Field(() => BooleanFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BooleanFilterArgType)
  published?: BooleanFilterArgType;
  @Field(() => BooleanFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => BooleanFilterArgType)
  outOfStock?: BooleanFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  authorId?: IdFilterArgType;
}
