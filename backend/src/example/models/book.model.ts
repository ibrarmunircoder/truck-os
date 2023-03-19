import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthorModel } from 'src/example/models';

@ObjectType()
export class BookModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  publishingDate?: Date;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  published?: boolean;

  @Field({ nullable: true })
  outOfStock?: boolean;

  @Field(() => ID, { nullable: true })
  authorId: string;

  @Field(() => AuthorModel, { nullable: true })
  author: AuthorModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
