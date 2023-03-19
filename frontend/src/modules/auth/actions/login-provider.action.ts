import { createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_LOCALE_COOKIE_MAX_AGE_SECONDS,AUTH_LOCALE_COOKIE_NAME } from 'modules/auth/constants';
import { setCookie } from 'modules/common/utils';
import { signIn } from 'next-auth/react';

export interface LoginProviderActionRequestInterface {
  provider: string;
  locale: string;
}

export const loginProviderAction = createAsyncThunk(
  'auth/loginProvider',
  async (request: LoginProviderActionRequestInterface, thunkAPI): Promise<void> => {
    try {
      setCookie(AUTH_LOCALE_COOKIE_NAME, request.locale, AUTH_LOCALE_COOKIE_MAX_AGE_SECONDS);
      await signIn(request.provider, { callbackUrl: `/${request.locale}` });
    } catch (err) {
      if (thunkAPI) {
        throw thunkAPI.rejectWithValue(err);
      }

      throw err;
    }
  },
);
