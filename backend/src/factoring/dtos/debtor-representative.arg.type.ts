import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from '@roq/class-validator';
import { Type } from 'class-transformer';
import {
  DebtorRepresentativeFilterArgType,
  DebtorRepresentativeOrderArgType,
  DebtorRepresentativeSearchArgType,
} from 'src/factoring/dtos';
import { BaseArgType } from 'src/library/argTypes';

@ArgsType()
export class DebtorRepresentativeArgType extends BaseArgType {
  @Field(() => DebtorRepresentativeSearchArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorRepresentativeSearchArgType)
  search?: DebtorRepresentativeSearchArgType;

  @Field(() => DebtorRepresentativeOrderArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorRepresentativeOrderArgType)
  order?: DebtorRepresentativeOrderArgType;

  @Field(() => DebtorRepresentativeFilterArgType, { nullable: true })
  @ValidateNested()
  @Type(() => DebtorRepresentativeFilterArgType)
  filter?: DebtorRepresentativeFilterArgType;
}
