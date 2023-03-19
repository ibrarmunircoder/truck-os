import { OperationStatusInterface } from 'modules/common/interfaces/operation-status.interface';

export interface AsyncOperationStateInterface<TOperationParams = unknown, TOperationResult = unknown> {
  isLoading: boolean;
  params: TOperationParams;
  status: OperationStatusInterface<TOperationResult> | null;
}
