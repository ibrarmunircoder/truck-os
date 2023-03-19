import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class FileAssociationOptionsDto {
  @Field({ nullable: false })
  entityIdentifier: string;

  @Field({ nullable: false })
  entityName: string;

  @Field({ nullable: true })
  @IsOptional()
  fileId?: string;
}
