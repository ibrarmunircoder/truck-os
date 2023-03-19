import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface ResendUserInviteActionVariablesInterface {
  id: string;
}

export interface ResendUserInviteActionRequestInterface extends MutationOptions {
  variables: ResendUserInviteActionVariablesInterface;
}

export const resendUserInviteAction = createAsyncThunk(
  'userInvites/resend',
  (request: ResendUserInviteActionRequestInterface, thunkApi): Promise<void> =>
    requestGql<void>(request, thunkApi, 'resendUserInvite'),
);
