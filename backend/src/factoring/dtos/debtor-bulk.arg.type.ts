import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { DebtorFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class DebtorBulkArgType {
  @Field(() => DebtorFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorFilterArgType)
  filter?: DebtorFilterArgType;
}
