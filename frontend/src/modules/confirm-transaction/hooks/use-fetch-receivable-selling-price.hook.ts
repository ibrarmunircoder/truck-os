import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';


export interface InclusiveFeesInterface {
    instantBuyDiscountRate: number,
    instantBuyDiscountInPercent: number,
    debtorHasKnownRating: boolean
}


export interface ReceivableSellingPriceResultInterface{
    receivableSellingPrice: InclusiveFeesInterface;
}


interface UseFetchReceivableSellingPriceInterface {
    fetchInclusiveFees: (debtorReferenceId: string, invoiceDate: string, dueDate: string) => Promise<ReceivableSellingPriceResultInterface>;
}

export const useFetchReceivableSellingPrice = (): UseFetchReceivableSellingPriceInterface => {
    const fetchInclusiveFees = async (debtorReferenceId: string, invoiceDate: string, dueDate: string): Promise<ReceivableSellingPriceResultInterface> =>
        requestGql({
            query: gql`
            query receivableSellingPrice($debtorReferenceId : String!, $invoiceDate : String!, $dueDate :String!) {
                receivableSellingPrice(debtorReferenceId: $debtorReferenceId, invoiceDate: $invoiceDate, dueDate: $dueDate) {
                    instantBuyDiscountRate
                    instantBuyDiscountInPercent
                    debtorHasKnownRating
                }
            }
        `,
            variables: { debtorReferenceId, invoiceDate, dueDate },
        })

    return {
        fetchInclusiveFees,
    };
};

