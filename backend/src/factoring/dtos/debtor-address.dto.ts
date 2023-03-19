import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from '@roq/class-validator';

@InputType()
export class DebtorAddressDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  street?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  addressAddon?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  postCode?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  country?: string;
}
