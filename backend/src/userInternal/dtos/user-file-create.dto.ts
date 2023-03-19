import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsMimeType,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from '@roq/class-validator';
import { JsonObject } from 'src/library/scalars';

@InputType()
export class UserFileCreateDto {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MaxLength(255)
  fileName: string;

  @Field(() => JsonObject, { nullable: true })
  @IsObject()
  @IsOptional()
  customMetaData: Record<string, unknown>;

  @Field({ nullable: false })
  @IsMimeType()
  @IsDefined()
  fileType: string;
}
