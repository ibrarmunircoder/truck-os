import {
  useAsyncOperations,
  UseAsyncOperationsConfigMapInterface,
  UseAsyncOperationsCurrentOperationInterface,
} from 'modules/common/hooks';
import { AsyncOperationConfigInterface, OperationConfirmationInterface } from 'modules/common/interfaces';
import { useActivateUser, useDeactivateUser } from 'modules/users/hooks';
import { useCallback } from 'react';

interface UserEditOperationsConfigInterface extends UseAsyncOperationsConfigMapInterface {
  activateUser: AsyncOperationConfigInterface<string>;
  deactivateUser: AsyncOperationConfigInterface<string>;
}

interface UseUserEditInterface extends OperationConfirmationInterface {
  activateUser: () => void;
  deactivateUser: () => void;
  currentOperation: UseAsyncOperationsCurrentOperationInterface<
    UserEditOperationsConfigInterface,
    keyof UserEditOperationsConfigInterface
  > | null;
  resetState: () => void;
}

interface UseUserEditOperationsInterface {
  userId: string;
  onSuccess?: (result: unknown, operationName: string) => void;
  onError?: (error: Error, operationName: string) => void;
}

export const useUserEditOperations = ({
  userId,
  onSuccess,
  onError,
}: UseUserEditOperationsInterface): UseUserEditInterface => {
  const { deactivateUser } = useDeactivateUser();
  const { activateUser } = useActivateUser();

  const { initiateOperation, onConfirm, onCancel, currentOperation, resetState } = useAsyncOperations({
    operations: {
      activateUser: {
        callback: useCallback(() => activateUser(userId), []),
        confirmable: true,
      },
      deactivateUser: {
        callback: useCallback(() => deactivateUser(userId), []),
        confirmable: true,
      },
    },
    onSuccess,
    onError,
  });

  return {
    activateUser: useCallback(() => initiateOperation('activateUser', null), [initiateOperation]),
    deactivateUser: useCallback(() => initiateOperation('deactivateUser', null), [initiateOperation]),
    onConfirm,
    onCancel,
    currentOperation,
    resetState,
  };
};
