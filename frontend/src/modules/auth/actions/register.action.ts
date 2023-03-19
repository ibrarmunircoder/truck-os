import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface RegisterFormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone: string;
  locale: string;
}

export interface RegisterActionVariablesInterface {
  data: RegisterFormValuesInterface;
}

export interface RegisterActionRequestInterface extends MutationOptions {
  variables: RegisterActionVariablesInterface;
}

export const registerAction = createAsyncThunk(
  'auth/register',
  (request: RegisterActionRequestInterface, thunkApi): Promise<void> =>
    requestGql<void>(request, thunkApi),
);
