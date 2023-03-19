import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { CompanyRegisterInterface } from 'views/company-register/utils/initial-values.util';

interface BusinessDataUpdateActionInterface extends MutationOptions {
  variables: {
    accountId: string;
    companyData: CompanyRegisterInterface;
  };
  keyResponse: string;
}

export const businessDataUpdateAction = createAsyncThunk(
  'company-register/updateBusinessData',
  async (request: BusinessDataUpdateActionInterface, thunkApi) => {
    const { keyResponse, ...apolloRequest } = request;
    return requestGql<void>(apolloRequest, thunkApi, keyResponse);
  },
);
