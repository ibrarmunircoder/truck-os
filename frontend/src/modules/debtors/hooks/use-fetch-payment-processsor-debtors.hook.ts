import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';


export interface PaymentProcesssorDebtorInterface {
    referenceId?: string;
    status: string;
    name: string;
    registrationNumber: string;
    registrationAuthorityCode: string;
    legalForm: string;
    addressPostCode: string;
    addressCity: string;
    addressStreet: string;
    country: string;
    applicableLaw: string;
    paymentTerms: number;
}

export interface DebtorsResultInterface {
    getDebtorsDataList: PaymentProcesssorDebtorInterface[]
}

interface UseFetchPaymentProcessorDebtorsInterface {
    fetchPaymentProcessorDebtors: () => Promise<DebtorsResultInterface>;
}

export const useFetchPaymentProcesssorDebtors = (): UseFetchPaymentProcessorDebtorsInterface => {
    const fetchPaymentProcessorDebtors = async (): Promise<DebtorsResultInterface> =>
        requestGql({
            mutation: gql`
            mutation getDebtorsDataList {
                getDebtorsDataList{
                    status
                    name
                    registrationNumber
                    registrationAuthorityCode
                    legalForm
                    addressPostCode
                    addressCity
                    addressStreet
                    country
                    applicableLaw
                    paymentTerms
                }
            }
            `,
        })
    return {
        fetchPaymentProcessorDebtors,
    };
};

