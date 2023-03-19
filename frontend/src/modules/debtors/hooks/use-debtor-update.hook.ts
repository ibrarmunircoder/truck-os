import { gql } from '@apollo/client'
import { requestGql } from 'modules/common/utils/request-gql';

export interface DebtorUpdateResultInterface {
    updateDebtor: DebtorUpdateMutationVariablesInterface;
}

interface DebtorUpdateMutationVariablesInterface {
    name?: string;
    commercialRegister?: string;
    commercialRegisterNumber?: string;
    legalForm?: string;
    validated?: boolean;
    debtorReferenceId?: string;
    city?: string;
    postalCode?: string;
    streetAndNumber?: string;
    country?: string;
}

export interface UseDebtorUpdateInterface {
    handleUpdateDebtor: (id: string, debtor: DebtorUpdateMutationVariablesInterface) => Promise<DebtorUpdateResultInterface>;
}

export const useDebtorUpdate = (): UseDebtorUpdateInterface => {
    const handleUpdateDebtor = async (id: string, debtor: DebtorUpdateMutationVariablesInterface): Promise<DebtorUpdateResultInterface> =>
        requestGql({
            mutation: gql`
            mutation updateDebtor($id: ID!, $debtor: DebtorUpdateDto!) {
                updateDebtor(id: $id, debtor: $debtor) {
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
                }
            }
        `,
            variables: { id, debtor },
        })

    return {
        handleUpdateDebtor,
    };
};
