import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { DebtorRepresentativeOrderSortEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class DebtorRepresentativeOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => DebtorRepresentativeOrderSortEnum)
  @IsDefined()
  @IsEnum(DebtorRepresentativeOrderSortEnum)
  sort: DebtorRepresentativeOrderSortEnum;
}
