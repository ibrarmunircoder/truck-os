import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

interface DeleteAccountUserActionInterface extends MutationOptions {
  variables: {
    id: string;
  };
  keyResponse: string;
}

export const deleteAccountUserAction = createAsyncThunk(
  'company-register/deleteAccountUser',
  async (request: DeleteAccountUserActionInterface, thunkApi) => {
    const { keyResponse, ...apolloRequest } = request;
    return requestGql<void>(apolloRequest, thunkApi, keyResponse);
  },
);
