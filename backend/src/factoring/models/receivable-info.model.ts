import { Field, ObjectType } from '@nestjs/graphql';
import { ReceivableStatusEnum } from 'src/factoring/enums';
import { ReceivableDataModel } from 'src/factoring/models';

@ObjectType()
export class ReceivableInfoModel {
  @Field({ nullable: true })
  referenceId: string;

  @Field(() => ReceivableStatusEnum, { nullable: true })
  status?: ReceivableStatusEnum;

  @Field(() => ReceivableDataModel, { nullable: true })
  data?: ReceivableDataModel;
}
