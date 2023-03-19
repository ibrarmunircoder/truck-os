import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

export interface CustomerCreateResultInterface {
    createNewDebtor: DebtorNewCreateInterface;
}

export interface DebtorRelationContactInterface {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
}

export interface DebtorRelationInterface {
    customerReference?: string;
    applicableLaw?: string;
    paymentTerms?: number;
    contacts?: DebtorRelationContactInterface[];
}
export interface DebtorAddressInterface {
    street?: string;
    addressAddon?: string;
    city?: string;
    postCode?: string;
    country?: string;
}

export interface DebtorNewCreateInterface {
    name?: string;
    registrationAuthorityCode?: string;
    registrationNumber?: string;
    vatNumber?: string;
    legalForm?: string;
    lei?: string;
    address?: DebtorAddressInterface;
    relation?: DebtorRelationInterface;
}



interface UseDebtorCreateInterface {
    handleDebtorCreate: (data: DebtorNewCreateInterface, debtorReferenceId: string) => Promise<CustomerCreateResultInterface>;
}

export const useCreateNewDebtor = (): UseDebtorCreateInterface => {
    const handleDebtorCreate = async (data: DebtorNewCreateInterface, debtorReferenceId: string): Promise<CustomerCreateResultInterface> =>
        requestGql({
            mutation: gql`
            mutation createNewDebtorMutation($debtorReferenceId: String!, $data: DebtorNewCreateDto!) {
                createNewDebtor(debtorReferenceId:$debtorReferenceId, debtor: $data) {
                    debtorStatus
                }
              }
            `,
            variables: { data, debtorReferenceId },
        })

    return {
        handleDebtorCreate,
    };
};

