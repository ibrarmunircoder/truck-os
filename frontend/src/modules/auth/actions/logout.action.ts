import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'next-auth/react';

export interface LogoutActionRequestInterface extends MutationOptions {}

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (request, thunkAPI): Promise<void> => {
    try {
      await signOut({ redirect: false })
    } catch (err) {
      if (thunkAPI) {
        throw thunkAPI.rejectWithValue(err);
      }
      throw err
    }
  }
);
