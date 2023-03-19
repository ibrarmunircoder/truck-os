import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

export interface DebtorRepresentativeCreateResultInterface {
    createDebtorRepresentative: DebtorRepresentativeCreateMutationVariablesInterface;
}

interface DebtorRepresentativeCreateMutationVariablesInterface {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
    debtorId?: string;
}

interface UseDebtorCreateInterface {
    handleDebtorRepresentativeCreate: (variables: DebtorRepresentativeCreateMutationVariablesInterface) => Promise<DebtorRepresentativeCreateResultInterface>;
}

export const useDebtorRepresentativeCreate = (): UseDebtorCreateInterface => {
    const handleDebtorRepresentativeCreate = async (variables: DebtorRepresentativeCreateMutationVariablesInterface): Promise<DebtorRepresentativeCreateResultInterface> =>
        requestGql({
            mutation: gql`
            mutation createDebtorRepresentativeMutation($data: DebtorRepresentativeCreateDto!) {
                createDebtorRepresentative(debtorRepresentative: $data) {
                  id
                  name
                  phone
                  email
                  debtorId
                }
              }
            `,
            variables: { data: variables },
        })

    return {
        handleDebtorRepresentativeCreate,
    };
};

