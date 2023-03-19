import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface ForgotPasswordFormValuesInterface {
  email: string | string[];
}

export interface ForgotPasswordActionVariablesInterface {
  data: ForgotPasswordFormValuesInterface;
}

export interface ForgotPasswordActionRequestInterface extends MutationOptions {
  variables: ForgotPasswordActionVariablesInterface;
}

export const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPassword',
  (request: ForgotPasswordActionRequestInterface, thunkApi): Promise<void> =>
    requestGql<void>(request, thunkApi),
);
