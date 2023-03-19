import { createAsyncThunk } from '@reduxjs/toolkit';
import { NextAuthError } from 'modules/common/errors';
import { signIn, SignInResponse } from 'next-auth/react';

export interface AccountActivateActionRequestDataInterface {
  token: string;
}

export interface AccountActivateActionRequestInterface {
  data: AccountActivateActionRequestDataInterface;
}

export const accountActivateAction = createAsyncThunk(
  'auth/accountActivate',
  async (request: AccountActivateActionRequestInterface, thunkAPI): Promise<void> => {
    try {
      const result: SignInResponse = await signIn('account-activate', { ...request.data, redirect: false })

      if (result?.error) { // next-auth doesn't send 401 code in a case of custom error, so we can't use result.ok
        throw new NextAuthError(result?.error)
      }
    } catch (err) {
      if (thunkAPI) {
        throw thunkAPI.rejectWithValue(err);
      }

      throw err
    }
  }
);
