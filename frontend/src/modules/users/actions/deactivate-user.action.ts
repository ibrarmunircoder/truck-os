import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInterface } from 'modules/users/interfaces';

export interface DeactivateUserActionVariablesInterface {
  id: string;
}

export interface DeactivateUserRequestInterface extends MutationOptions {
  variables: DeactivateUserActionVariablesInterface;
}

export interface DeactivateUserResponseInterface {
  user: UserInterface;
}

export const deactivateUserAction = createAsyncThunk(
  'user/deactivateUser',
  (request: DeactivateUserRequestInterface, thunkApi): Promise<DeactivateUserResponseInterface> =>
    requestGql<DeactivateUserResponseInterface>(request, thunkApi, 'deactivateUser'),
);
