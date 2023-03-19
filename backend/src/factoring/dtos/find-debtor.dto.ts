
import { Field,  InputType, } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from '@roq/class-validator';

@InputType()
export class FindDebtorDto {
    @Field({ nullable: true })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    vatNumber?: string;

    @Field()
    @MaxLength(255)
    @IsString()
    commercialRegister?: string;

    @Field()
    @MaxLength(255)
    @IsString()
    commercialRegisterNumber?: string;
}
