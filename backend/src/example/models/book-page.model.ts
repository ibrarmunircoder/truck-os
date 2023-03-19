import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookModel } from 'src/example/models';

@ObjectType()
export class BookPageModel {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [BookModel])
  data: BookModel[];
}
