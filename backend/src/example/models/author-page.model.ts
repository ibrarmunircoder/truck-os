import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AuthorModel } from 'src/example/models';

@ObjectType()
export class AuthorPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [AuthorModel])
  data: AuthorModel[];
}
