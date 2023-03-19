import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from '@roq/class-validator';
import { DebtorOrderSortEnum } from 'src/factoring/enums';
import { OrderEnum } from 'src/library/enums';

@InputType()
export class DebtorOrderArgType {
  @Field(() => OrderEnum)
  @IsDefined()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @Field(() => DebtorOrderSortEnum)
  @IsDefined()
  @IsEnum(DebtorOrderSortEnum)
  sort: DebtorOrderSortEnum;
}
