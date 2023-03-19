import { gql } from '@apollo/client'
import { requestGql } from 'modules/common/utils/request-gql';

export interface DebtorRepresentativeUpdateResultInterface {
    updateDebtorRepresentative: DebtorRepresentativeUpdateMutationVariablesInterface;
}

interface DebtorRepresentativeUpdateMutationVariablesInterface {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    debtorId: string;
}

export interface UseDebtorRepresentativeUpdateInterface {
    handleUpdateDebtorRepresentative: (id: string, debtorRepresentative: DebtorRepresentativeUpdateMutationVariablesInterface) => Promise<DebtorRepresentativeUpdateResultInterface>;
}

export const useUpdateDebtorRepresentative = (): UseDebtorRepresentativeUpdateInterface => {
    const handleUpdateDebtorRepresentative = async (id: string, debtorRepresentative: DebtorRepresentativeUpdateMutationVariablesInterface): Promise<DebtorRepresentativeUpdateResultInterface> =>
        requestGql({
            mutation: gql`
            mutation updateDebtorRepresentative($id: ID!, $debtorRepresentative: DebtorRepresentativeUpdateDto!) {
                updateDebtorRepresentative(id: $id, debtorRepresentative: $debtorRepresentative) {
                    id
                    name
                    phone
                    email
                    debtorId
                }
            }
        `,
            variables: { id, debtorRepresentative },
        })

    return {
        handleUpdateDebtorRepresentative,
    };
};
