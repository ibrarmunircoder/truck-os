import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { OrderFileUploadTypeEnum } from 'src/factoring/enums';

@InputType()
export class OrderFileCreateDto {
  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  name: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  key: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  contentType: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  orderId: string;

  @Field(() => OrderFileUploadTypeEnum, { nullable: false })
  @IsDefined()
  @IsEnum(OrderFileUploadTypeEnum)
  fileCategory: OrderFileUploadTypeEnum;
}
