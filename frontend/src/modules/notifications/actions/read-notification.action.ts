import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface ReadNotificationActionVariablesInterface {
  id: string;
}

export interface ReadNotificationRequestInterface extends MutationOptions {
  variables: ReadNotificationActionVariablesInterface;
}

interface NotificationUser {
  id: string
  read: boolean
  userId: string
}

export interface ReadNotificationResponseInterface {
  id: string;
  title: string;
  notificationUsers: {
    data: NotificationUser[]
  }
}

export const readNotificationAction = createAsyncThunk(
  'notification/read',
  (
    request: ReadNotificationRequestInterface,
    thunkApi,
  ): Promise<ReadNotificationResponseInterface> =>
    requestGql<ReadNotificationResponseInterface>(request, thunkApi, 'markAsReadNotification')
);
