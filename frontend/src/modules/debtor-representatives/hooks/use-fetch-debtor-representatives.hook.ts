import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { DebtorRepresentativesResultsInterface } from 'modules/debtors/interfaces';


interface UseDebtorCreateInterface {
    fetchDebtorsRepresentatives: () => Promise<DebtorRepresentativesResultsInterface>;
}

export const useFetchDebtorRepresentatives = (): UseDebtorCreateInterface => {
    const fetchDebtorsRepresentatives = (): Promise<DebtorRepresentativesResultsInterface> =>
        requestGql({
            query: gql`
                query debtorRepresentativesQuery {
                    debtorRepresentatives {
                        totalCount
                        data {
                            id
                            email
                            name
                            firstName
                            lastName
                            phone
                            debtorId
                        }
                    }
                }
            `
        })

    return {
        fetchDebtorsRepresentatives,
    };
};

