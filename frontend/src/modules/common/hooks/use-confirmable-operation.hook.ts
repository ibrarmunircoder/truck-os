import {
  UseAsyncHookInterface,
  useAsyncOperation
} from 'modules/common/hooks/use-async-operation.hook'
import { AsyncOperationConfigInterface } from 'modules/common/interfaces/async-operation-config.interface';
import { useCallback, useState } from 'react'

export interface UseConfirmableOperationInterface<T, K>
  extends Omit<UseAsyncHookInterface<T, K>, 'initiateOperation'> {
  initiateOperation: (args: T) => void;
  operationParams: T;
  onConfirm: () => Promise<K | Error>;
  onCancel: () => void;
}

export const useConfirmableOperation = <T, K>({
  callback,
  onSuccess,
  onError
}: AsyncOperationConfigInterface<T, K>)
  : UseConfirmableOperationInterface<T, K> => {
  const [operationParams, setOperationParams] = useState<T>();

  const {
    initiateOperation: initiateAsyncOperation,
    isLoading,
    resetStatus: resetAsyncOperationStatus,
    status
  } = useAsyncOperation({
    callback,
    onSuccess,
    onError
  })

  const initiateOperation = useCallback((args) => {
    setOperationParams(args);
  }, [setOperationParams])

  const resetStatus = useCallback(() => {
    resetAsyncOperationStatus();
  }, [resetAsyncOperationStatus, setOperationParams])

  const onConfirm = useCallback(() => initiateAsyncOperation(operationParams)
    .then((data) => {
      setOperationParams(null)
      return data;
    }), [initiateAsyncOperation, operationParams]);

  const onCancel = useCallback(() => {
    setOperationParams(null)
  }, [setOperationParams])

  return {
    operationParams,
    initiateOperation,
    onCancel,
    onConfirm,
    isLoading,
    status,
    resetStatus,
  }
}
