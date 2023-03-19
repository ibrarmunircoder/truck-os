import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { DebtorInterface } from 'modules/debtors/interfaces';

export interface DebtorResultInterface{
    debtor: DebtorInterface
}


interface UseDebtorsInterface {
    fetchSingleDebtor: (id: string) => Promise<DebtorResultInterface>;
}

export const useFetchDebtor = (): UseDebtorsInterface => {
    const fetchSingleDebtor = async (id: string): Promise<DebtorResultInterface> =>
        requestGql({
            query: gql`
                query debtor($id: ID!) {
                debtor(id: $id) {
                    id
                    name
                    vatNumber
                    addressAddon
                    commercialRegister 
                    commercialRegisterNumber 
                    legalForm
                    validated
                    debtorReferenceId
                    city
                    postalCode
                    streetAndNumber
                    country
                    debtorRepresentatives {
                        data {
                            id
                            email
                            phone
                            name
                            firstName
                            lastName
                            debtorId
                        }
                    }
                }
              }
            `,
            variables: { id },
        })


    return {
        fetchSingleDebtor,
    };
};

