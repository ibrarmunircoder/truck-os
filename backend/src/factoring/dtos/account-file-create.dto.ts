import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { AccountFileEnum } from 'src/factoring/enums';

@InputType()
export class AccountFileCreateDto {
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
  accountId: string;

  @Field({ nullable: false })
  @IsDefined()
  @IsEnum(AccountFileEnum)
  fileCategory: AccountFileEnum;
}
