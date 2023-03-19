import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';

interface UseReferenceAssignDebtorInterface {
    referenceIdAssignToDebtor: (referenceId: string, customerReference: string) => void;
}

export const useReferenceIdAssign = (): UseReferenceAssignDebtorInterface => {
    const referenceIdAssignToDebtor = async (referenceId: string, customerReference: string) =>
        requestGql({
            mutation: gql`
            mutation assignReferenceIdToDebtor($referenceId: String!, $customerReference: String!) {
                assignReferenceIdToDebtor(referenceId: $referenceId, customerReference: $customerReference){
                    status
                }
            }
            `,
            variables: { referenceId, customerReference },
        })
    return {
        referenceIdAssignToDebtor,
    };
};

