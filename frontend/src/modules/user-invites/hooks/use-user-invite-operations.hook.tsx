import {
  useAsyncOperations,
  UseAsyncOperationsConfigMapInterface,
  UseAsyncOperationsCurrentOperationInterface,
} from 'modules/common/hooks';
import { AsyncOperationConfigInterface, OperationConfirmationInterface } from 'modules/common/interfaces';
import { useCancelUserInvite, useResendUserInvite } from 'modules/user-invites/hooks';
import { useCallback } from 'react';

interface UserInviteOperationsConfigInterface extends UseAsyncOperationsConfigMapInterface {
  cancelInvite: AsyncOperationConfigInterface<string>;
  resendInvite: AsyncOperationConfigInterface<string>;
}

interface UseUserEditInterface extends OperationConfirmationInterface {
  cancelInvite: () => void;
  resendInvite: () => void;
  currentOperation: UseAsyncOperationsCurrentOperationInterface<
    UserInviteOperationsConfigInterface,
    keyof UserInviteOperationsConfigInterface
  > | null;
  resetState: () => void;
}

interface UserInviteOperationsInterface {
  id: string;
  onSuccess?: (result: unknown, operationName: string) => void;
  onError?: (error: Error, operationName: string) => void;
}

export const useUserInviteOperations = ({
  id,
  onSuccess,
  onError,
}: UserInviteOperationsInterface): UseUserEditInterface => {
  const { resendUserInvite } = useResendUserInvite();
  const { cancelUserInvite } = useCancelUserInvite();

  const { initiateOperation, currentOperation, resetState, onConfirm, onCancel } = useAsyncOperations({
    operations: {
      cancelInvite: {
        callback: useCallback(() => cancelUserInvite(id), []),
      },
      resendInvite: {
        callback: useCallback(() => resendUserInvite(id), []),
      },
    },
    onSuccess,
    onError,
  });

  return {
    cancelInvite: useCallback(() => initiateOperation('cancelInvite', null), [initiateOperation]),
    resendInvite: useCallback(() => initiateOperation('resendInvite', null), [initiateOperation]),
    currentOperation,
    resetState,
    onConfirm,
    onCancel,
  };
};
