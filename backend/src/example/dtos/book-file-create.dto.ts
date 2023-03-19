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
import { ArrayMinSize, IsArray } from 'class-validator';
import { BookFileAssociationOptionsDto } from 'src/example/dtos';
import { JsonObject } from 'src/library/scalars';

@InputType()
export class BookFileCreateDto {
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

  @Field(() => [BookFileAssociationOptionsDto], { nullable: false })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  fileAssociationOptions: BookFileAssociationOptionsDto[];
}
