import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AuthorGenderEnum } from 'src/example/enums';
import { BookPageModel } from 'src/example/models';
import { JsonObject } from 'src/library/scalars';

@ObjectType()
export class AuthorModel {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  email?: string;

  /**
   * Address with street, houseDumber, zipCode, city, country as json fields
   */
  @Field(() => JsonObject, { nullable: true })
  address?: Record<string, unknown>;

  @Field(() => AuthorGenderEnum, { nullable: true })
  gender?: AuthorGenderEnum;

  @Field(() => BookPageModel)
  books: BookPageModel;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
