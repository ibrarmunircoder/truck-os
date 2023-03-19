import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenModel {
  @Field()
  accessToken: string;

  constructor(partial: Partial<AccessTokenModel>) {
    Object.assign(this, partial);
  }
}
