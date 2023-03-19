import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

export interface CustomerCreateResultInterface{
    createDebtor: CustomerCreateMutationVariablesInterface;
}

interface CustomerCreateMutationVariablesInterface {
    id?: string;
    name?: string;
    vatNumber?: string;
    addressAddon?: string;
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

interface UseDebtorCreateInterface {
    handleCustomerCreate: (variables: CustomerCreateMutationVariablesInterface) => Promise<CustomerCreateResultInterface>;
}

export const useCustomerCreate = (): UseDebtorCreateInterface => {
    const handleCustomerCreate = async (variables: CustomerCreateMutationVariablesInterface): Promise<CustomerCreateResultInterface> =>
        requestGql({
            mutation: gql`
            mutation createDebtorMutation($data: DebtorCreateDto!) {
                createDebtor(debtor: $data) {
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
            variables: { data: variables },
        })

    return {
        handleCustomerCreate,
    };
};

