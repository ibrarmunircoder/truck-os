import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { DebtorsResultInterface } from 'modules/debtors/interfaces';


interface UseDebtorsInterface {
    fetchDebtors: (accountId: string) => Promise<DebtorsResultInterface>;
}

export const useFetchDebtors = (): UseDebtorsInterface => {
    const fetchDebtors = async (accountId: string): Promise<DebtorsResultInterface> =>
        requestGql({
            query: gql`
                query debtorsQuery($filter: DebtorFilterArgType!) {
                    debtors(filter: $filter) {
                        totalCount
                        data {
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
                }
            `,
            variables: { filter: { accountId: { equalTo: accountId } } },
        })

    return {
        fetchDebtors,
    };
};

