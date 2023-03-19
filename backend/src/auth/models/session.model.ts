import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionModel {
  @Field()
  accessToken: string;

  @Field({ nullable: true })
  refreshToken?: string;

  @Field({ nullable: true })
  platformAccessToken?: string;

  @Field(() => ID)
  userId: string;
}
