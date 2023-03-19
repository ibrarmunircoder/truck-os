import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface AccountActivateProviderLinkValuesInterface {
  token: string | string[];
  provider: string | string[];
}

export interface AccountActivateProviderLinkActionVariablesInterface {
  data: AccountActivateProviderLinkValuesInterface;
}

export interface AccountActivateProviderLinkActionRequestInterface extends MutationOptions {
  variables: AccountActivateProviderLinkActionVariablesInterface;
}

export const accountActivateProviderLinkAction = createAsyncThunk(
  'auth/accountActivateProviderLink',
  (request: AccountActivateProviderLinkActionRequestInterface, thunkApi): Promise<void> =>
    requestGql<void>(request, thunkApi),
);
