import { AsyncOperationConfigInterface } from 'modules/common/interfaces/async-operation-config.interface';
import { OperationStatusInterface } from 'modules/common/types';
import { useCallback, useReducer } from 'react';

export interface UseAsyncHookInterface<TParams, TResult> {
  status: OperationStatusInterface<TResult>;
  isLoading: boolean;
  initiateOperation: (params: TParams) => Promise<TResult>;
  resetStatus: () => void;
}

enum ActionTypes {
  Value,
  Error,
  Loading,
  ResetStatus
}

const initialState = ({
  status: null,
  isLoading: false,
});

const stateReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.Value:
      return {
        status: { success: true, result: action.payload, error: null }, isLoading: false
      };
    case ActionTypes.Error:
      return {
        status: { success: false, error: action.payload, result: null }, isLoading: false
      };
    case ActionTypes.Loading:
      return { ...state, loading: true };
    case ActionTypes.ResetStatus:
      return { ...state, status: null }
    default:
      return state;
  }
}

export const useAsyncOperation = <TOperationParams, TOperationResult>(
  {
    callback,
    onSuccess,
    onError
  }: AsyncOperationConfigInterface<TOperationParams, TOperationResult>
): UseAsyncHookInterface<TOperationParams, TOperationResult> => {
  const [state, setState] = useReducer(stateReducer, initialState);
  const initiateOperation = useCallback(async (args) => {
    try {
      setState({ type: ActionTypes.Loading });
      const result = await callback(args);
      setState({ type: ActionTypes.Value, payload: result });
      if (onSuccess) {
        await onSuccess(result)
      }
      return result;
    } catch (error) {
      setState({ type: ActionTypes.Error, payload: error });
      if (onError) {
        await onError(error)
      }
      return error;
    }
  }, [callback]);

  const resetStatus = useCallback(() => {
    setState({ type: ActionTypes.ResetStatus });
  }, [setState])

  return {
    ...state,
    initiateOperation,
    resetStatus
  }
}
