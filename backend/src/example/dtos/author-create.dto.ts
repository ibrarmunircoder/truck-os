import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from '@roq/class-validator';
import { AuthorGenderEnum } from 'src/example/enums';
import { JsonObject } from 'src/library/scalars';

@InputType()
export class AuthorCreateDto {
  @Field({ nullable: true })
  @MinLength(3)
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  surname?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  age?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @Field({ nullable: true })
  @IsEmail()
  @MaxLength(255)
  @IsString()
  @IsOptional()
  email?: string;

  /**
   * Address with street, houseDumber, zipCode, city, country as json fields
   */
  @Field(() => JsonObject, { nullable: true })
  @IsObject()
  @IsOptional()
  address?: Record<string, unknown>;

  @Field(() => AuthorGenderEnum, { nullable: true })
  @IsEnum(AuthorGenderEnum)
  @IsOptional()
  gender?: AuthorGenderEnum;
}
