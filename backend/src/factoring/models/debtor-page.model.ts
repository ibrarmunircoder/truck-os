import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DebtorModel } from 'src/factoring/models';

@ObjectType()
export class DebtorPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [DebtorModel])
  data: DebtorModel[];
}
