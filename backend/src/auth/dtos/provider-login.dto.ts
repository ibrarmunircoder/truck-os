import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsString } from '@roq/class-validator';
import { LoginProviderEnum } from 'src/auth/enums';
import { Trim } from 'src/library/decorators';

@InputType()
export class ProviderLoginDto {
  @Field({ description: 'Provider id (system name) i.e. google, linkedin, apple' })
  @IsDefined()
  @IsString()
  @IsEnum(LoginProviderEnum)
  providerId: LoginProviderEnum;

  @Field({ description: 'User id returned by provider' })
  @IsDefined()
  @IsString()
  providerUserId: string;

  @Field()
  @IsString()
  @Trim()
  email: string;

  @Field({ nullable: true })
  @Trim()
  firstName: string;

  @Field({ nullable: true })
  @Trim()
  lastName: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  locale: string;
}
