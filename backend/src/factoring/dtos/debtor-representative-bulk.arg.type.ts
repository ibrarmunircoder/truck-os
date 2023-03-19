import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import { DebtorRepresentativeFilterArgType } from 'src/factoring/dtos';

@ArgsType()
export class DebtorRepresentativeBulkArgType {
  @Field(() => DebtorRepresentativeFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorRepresentativeFilterArgType)
  filter?: DebtorRepresentativeFilterArgType;
}
