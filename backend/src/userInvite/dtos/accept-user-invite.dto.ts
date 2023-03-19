import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsOptional, IsString, MaxLength } from '@roq/class-validator';

@InputType()
export class AcceptUserInviteDto {
  @Field({ nullable: false })
  @IsDefined()
  @IsString()
  @MaxLength(255)
  token: string;

  @Field({ nullable: false })
  @IsString()
  @IsDefined()
  @MaxLength(255)
  password: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  timezone?: string;

  @Field({ nullable: true })
  @MaxLength(5)
  @IsString()
  @IsOptional()
  locale?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  subscribeToMail: boolean;
}
