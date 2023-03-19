import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsDefined, IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';

@InputType()
export class UserLoginHistoryCreateDto {
  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  @IsDefined()
  ip: string;

  @Field({ nullable: false })
  @MaxLength(255)
  @IsString()
  @IsDefined()
  host: string;

  @Field({ nullable: false })
  @IsDate()
  @IsDefined()
  timestamp: Date;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
