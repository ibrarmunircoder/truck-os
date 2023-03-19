import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { AccountUserInterface } from 'views/company-register/interfaces';

interface AddCompanyAccountUserActionInterface extends MutationOptions {
  variables: {
    data: AccountUserInterface;
  };
  keyResponse: string;
}

export const addCompanyAccountUserAction = createAsyncThunk(
  'company-register/addAccountUser',
  async (request: AddCompanyAccountUserActionInterface, thunkApi) => {
    const { keyResponse, ...apolloRequest } = request;
    return requestGql<void>(apolloRequest, thunkApi, keyResponse);
  },
);
