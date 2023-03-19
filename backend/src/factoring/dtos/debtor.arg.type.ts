import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { DebtorFilterArgType, DebtorOrderArgType, DebtorSearchArgType } from 'src/factoring/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class DebtorArgType extends BaseArgType {
  @Field(() => DebtorSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorSearchArgType)
  search?: DebtorSearchArgType;

  @Field(() => DebtorOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorOrderArgType)
  order?: DebtorOrderArgType;

  @Field(() => DebtorFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorFilterArgType)
  filter?: DebtorFilterArgType;
}
