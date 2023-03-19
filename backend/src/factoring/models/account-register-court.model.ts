import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountRegisterCourtModel {
  @Field({ nullable: false })
  registerAuthorityCode: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  registrationNumberRequirement: string;

  @Field({ nullable: false })
  vatNumberRequirement: string;
}
