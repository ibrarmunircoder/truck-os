import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface CancelUserInviteActionVariablesInterface {
  id: string;
}

export interface CancelUserInviteActionRequestInterface extends MutationOptions {
  variables: CancelUserInviteActionVariablesInterface;
}

export const cancelUserInviteAction = createAsyncThunk(
  'userInvites/cancel',
  (request: CancelUserInviteActionRequestInterface, thunkApi): Promise<void> =>
    requestGql<void>(request, thunkApi, 'cancelUserInvite'),
);
