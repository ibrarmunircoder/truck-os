import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInterface } from 'modules/users/interfaces';

export interface ActivateUserActionVariablesInterface {
  id: string;
}

export interface ActivateUserRequestInterface extends MutationOptions {
  variables: ActivateUserActionVariablesInterface;
}

export interface ActivateUserResponseInterface {
  user: UserInterface;
}

export const activateUserAction = createAsyncThunk(
  'user/activateUser',
  (request: ActivateUserRequestInterface, thunkApi): Promise<ActivateUserResponseInterface> =>
    requestGql<ActivateUserResponseInterface>(request, thunkApi, 'activateUser'),
);
