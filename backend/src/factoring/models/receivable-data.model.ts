import { Field, ObjectType } from '@nestjs/graphql';
import { DebtorContactModel } from 'src/factoring/models';

@ObjectType()
export class ReceivableDataModel {
  @Field({ nullable: true })
  receivableType: string;

  @Field({ nullable: true })
  invoiceNumber?: string;

  @Field({ nullable: true })
  invoiceAmount?: number;

  @Field({ nullable: true })
  invoiceCurrency?: string;

  @Field({ nullable: true })
  invoiceDate?: string;

  @Field({ nullable: true })
  invoiceDueDate?: string;

  @Field({ nullable: true })
  applicableLaw?: string;

  @Field({ nullable: true })
  debtorReferenceId: string;

  @Field(() => DebtorContactModel, { nullable: true })
  debtorContact: DebtorContactModel;

  @Field({ nullable: true })
  requestIPU: boolean;
}
