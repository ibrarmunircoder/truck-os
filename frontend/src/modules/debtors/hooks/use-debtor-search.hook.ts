import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';


export interface DebtorSearchAddressInterface {
    street?: string;
    addressAddon?: string;
    city?: string;
    postCode?: string;
    country?: string;
}

export interface DebtorSearchInterface {
    name?: string;
    registrationAuthorityCode?: string;
    registrationNumber?: string;
    vatNumber?: string;
    legalForm?: string;
    lei?: string;
    address?: DebtorSearchAddressInterface;
}

export interface DebtorSearchDataInterface {
    referenceId?: string;
    status?: string;
    data?: DebtorSearchInterface;
}

export interface DebtorSearchResultInterface {
    debtorSearch: DebtorSearchDataInterface[]
}

interface UseDebtorsInterface {
    searchDebtors: (name: string) => Promise<DebtorSearchResultInterface>;
}

export const useDebtorSearch = (): UseDebtorsInterface => {
    const searchDebtors = async (name: string): Promise<DebtorSearchResultInterface> =>
        requestGql({
            query: gql`
                query debtorSearch($name: String!) {
                debtorSearch(name: $name) {
                    referenceId
                    status
                    data{
                        name
                        registrationAuthorityCode
                        registrationNumber
                        vatNumber
                        legalForm
                        lei
                        address {
                            street
                            addressAddon
                            city
                            postCode
                            country
                        }
                    } 
                }
              }
            `,
            variables: { name },
        })


    return {
        searchDebtors,
    };
};

