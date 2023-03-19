import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class OrderFileModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fileCategory?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => String, { nullable: true })
  contentType?: string;

  @Field({ nullable: true })
  @Type(() => Date)
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  @Type(() => Date)
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  url?: string;
}
