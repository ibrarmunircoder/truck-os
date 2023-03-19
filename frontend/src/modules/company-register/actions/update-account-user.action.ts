import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { AccountUserInterface } from 'views/company-register/interfaces';

interface UpdateAccountUserActionInterface extends MutationOptions {
  variables: {
    data: AccountUserInterface;
    id: string;
  };
  keyResponse: string;
}

export const updateAccountUserAction = createAsyncThunk(
  'company-register/updateAccountUser',
  async (request: UpdateAccountUserActionInterface, thunkApi) => {
    const { keyResponse, ...apolloRequest } = request;
    return requestGql<void>(apolloRequest, thunkApi, keyResponse);
  },
);
