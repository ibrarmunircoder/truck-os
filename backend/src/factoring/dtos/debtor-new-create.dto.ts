import { Field,  InputType} from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from '@roq/class-validator';
import { DebtorAddressDto, DebtorRelationDto } from 'src/factoring/dtos';

@InputType()
export class DebtorNewCreateDto {
  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  registrationAuthorityCode?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  vatNumber?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  legalForm?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  @IsString()
  @IsOptional()
  lei?: string;

  @Field(() => DebtorAddressDto, { nullable: true })
  @IsOptional()
  address?: DebtorAddressDto;

  @Field(() => DebtorRelationDto, { nullable: true })
  @IsOptional()
  relation?: DebtorRelationDto;
}
