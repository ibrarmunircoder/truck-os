import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DebtorRepresentativeModel } from 'src/factoring/models';

@ObjectType()
export class DebtorRepresentativePageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [DebtorRepresentativeModel])
  data: DebtorRepresentativeModel[];
}
