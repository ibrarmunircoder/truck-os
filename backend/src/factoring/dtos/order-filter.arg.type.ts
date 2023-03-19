import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import {
  BaseFilterArgType,
  DateFilterArgType,
  IdFilterArgType,
  IntFilterArgType,
  StringFilterArgType,
} from 'src/library/argTypes';

@InputType()
export class OrderFilterArgType extends BaseFilterArgType {
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  invoiceNumber?: StringFilterArgType;
  @Field(() => DateFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DateFilterArgType)
  deliveryDate?: DateFilterArgType;
  @Field(() => DateFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DateFilterArgType)
  invoiceDate?: DateFilterArgType;
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  applicableLaw?: StringFilterArgType;
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  paymentTerm?: StringFilterArgType;
  @Field(() => StringFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilterArgType)
  status?: StringFilterArgType;
  @Field(() => IntFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IntFilterArgType)
  invoiceAmount?: IntFilterArgType;

  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  accountId?: IdFilterArgType;
  @Field(() => IdFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => IdFilterArgType)
  debtorId?: IdFilterArgType;
}
