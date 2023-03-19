import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountLegalStructureModel {
  @Field({ nullable: false })
  elfCode: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  availableForDebtor: boolean;

  @Field({ nullable: false })
  availableForTrader: boolean;
}
