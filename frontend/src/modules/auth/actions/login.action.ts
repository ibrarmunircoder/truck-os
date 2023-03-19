import { createAsyncThunk } from '@reduxjs/toolkit';
import { NextAuthError } from 'modules/common/errors';
import { signIn } from 'next-auth/react';

export interface LoginActionRequestDataInterface {
  email: string;
  password: string;
}

export interface LoginActionRequestInterface {
  data: LoginActionRequestDataInterface;
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async (request: LoginActionRequestInterface, thunkAPI): Promise<void> => {
    try {
      const result = await signIn('credentials', { ...request.data, redirect: false })

      if (result.error) { // next-auth doesn't send 401 code in a case of custom error, so we can't use result.ok
        throw new NextAuthError(result.error)
      }
    } catch (err) {
      if (thunkAPI) {
        throw thunkAPI.rejectWithValue(err);
      }

      throw err
    }
  }
);
