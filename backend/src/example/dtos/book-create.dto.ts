import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from '@roq/class-validator';

@InputType()
export class BookCreateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  title?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  publishingDate?: Date;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  outOfStock?: boolean;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  authorId?: string;
}
