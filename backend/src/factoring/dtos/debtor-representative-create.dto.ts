import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID, MaxLength } from '@roq/class-validator';

@InputType()
export class DebtorRepresentativeCreateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  email?: string;

  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  debtorId?: string;
}
