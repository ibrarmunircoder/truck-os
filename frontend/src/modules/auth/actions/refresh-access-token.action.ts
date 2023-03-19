import { createAction } from '@reduxjs/toolkit';

export interface RefreshAccessTokenActionInterface {
  accessToken: string;
}

export const refreshAccessTokenAction = createAction<RefreshAccessTokenActionInterface>('auth/refreshToken');
