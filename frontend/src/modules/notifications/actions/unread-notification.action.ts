import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface UnreadNotificationActionVariablesInterface {
  id: string;
}

export interface UnreadNotificationRequestInterface extends MutationOptions {
  variables: UnreadNotificationActionVariablesInterface;
}

interface NotificationUser {
  id: string
  read: boolean
  userId: string
}

export interface UnreadNotificationResponseInterface {
  id: string;
  title: string;
  notificationUsers: {
    data: NotificationUser[]
  }
}

export const unreadNotificationAction = createAsyncThunk(
  'notification/unread',
  (
    request: UnreadNotificationRequestInterface,
    thunkApi,
  ): Promise<UnreadNotificationResponseInterface> =>
    requestGql<UnreadNotificationResponseInterface>(request, thunkApi, 'markAsUnreadNotification'),
);
