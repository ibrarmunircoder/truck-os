import {
  QueryInterface,
} from 'src/library/interfaces';

export interface ReceivableSellingPriceInterface extends QueryInterface {
  instantBuyDiscountRate: number,
  instantBuyDiscountInPercent: number,
  debtorHasKnownRating: boolean
}
