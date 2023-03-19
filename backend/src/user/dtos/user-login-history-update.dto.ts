import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';

@InputType()
export class UserLoginHistoryUpdateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  ip?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  host?: string;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  timestamp?: Date;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
