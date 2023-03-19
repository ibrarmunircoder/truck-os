import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { DebtorInterface } from 'modules/debtors/interfaces';

export interface DebtorFindQueryResultInterface {
    findDebtor: DebtorInterface;
}

export interface DebtorFindQueryInterface {
    vatNumber?: string;
    commercialRegister: string;
    commercialRegisterNumber: string;
}

interface UseDebtorsInterface {
    fetchSelectedDebtor: (debtorData: DebtorFindQueryInterface) => Promise<DebtorFindQueryResultInterface>;
}

export const useFetchSelectedDebtor = (): UseDebtorsInterface => {
    const fetchSelectedDebtor = async (debtorData: DebtorFindQueryInterface): Promise<DebtorFindQueryResultInterface> =>
        requestGql({
            query: gql`
                query findDebtor($debtorData: FindDebtorDto!) {
                    findDebtor(debtorData: $debtorData) {
                        id
                        name
                        vatNumber
                        addressAddon
                        commercialRegister 
                        commercialRegisterNumber 
                        legalForm
                        validated
                        debtorReferenceId
                        accountId
                        city
                        postalCode
                        streetAndNumber
                        country
                        isInternalDebtorFound
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
            variables: { debtorData },
        })


    return {
        fetchSelectedDebtor,
    };
};

