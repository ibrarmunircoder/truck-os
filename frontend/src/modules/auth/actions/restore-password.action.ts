import { createAsyncThunk } from '@reduxjs/toolkit';
import { NextAuthError } from 'modules/common/errors';
import { signIn, SignInResponse } from 'next-auth/react';

export interface RestorePasswordActionRequestDataInterface {
  token: string;
  password: string;
}

export interface RestorePasswordActionRequestInterface {
  data: RestorePasswordActionRequestDataInterface;
}

export const restorePasswordAction = createAsyncThunk(
  'auth/restorePassword',
  async (request: RestorePasswordActionRequestInterface, thunkAPI): Promise<void> => {
    try {
      const result: SignInResponse = await signIn('restore-password', { ...request.data, redirect: false })

      if (result?.error) { // next-auth doesn't send 401 code in a case of custom error, so we can't use result.ok
        throw new NextAuthError(result?.error)
      }
      // @todo: currently this does second request to server, since signIn also does such request,
      //  need to think how to avoid this
      // const session = await getSession()
      // return session
    } catch (err) {
      if (thunkAPI) {
        throw thunkAPI.rejectWithValue(err);
      }

      throw err
    }
  }
);
