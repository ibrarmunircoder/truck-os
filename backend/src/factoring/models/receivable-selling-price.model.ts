import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReceivableSellingPriceModel {
    @Field(() => Float, { nullable: true })
    instantBuyDiscountRate?: number;

    @Field(() => Float, { nullable: true })
    instantBuyDiscountInPercent?: number;

    @Field({ nullable: true })
    debtorHasKnownRating?: boolean;
}
