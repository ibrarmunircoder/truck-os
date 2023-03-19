import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsString } from '@roq/class-validator';
import { LoginProviderEnum } from 'src/auth/enums';

@InputType()
export class ProviderDisconnectDto {
  @Field()
  @IsDefined()
  @IsString()
  @IsEnum(LoginProviderEnum)
  providerId: LoginProviderEnum;
}
