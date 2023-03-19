import { MutationOptions } from '@apollo/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestGql } from 'modules/common/utils/request-gql';

export interface ReadAllNotificationsRequestInterface extends MutationOptions {}

export interface ReadAllNotificationsResponseInterface {
  markAllAsReadNotification: boolean;
}

export const readAllNotificationsAction = createAsyncThunk(
  'notification/read-all',
  (request: ReadAllNotificationsRequestInterface, thunkApi): Promise<ReadAllNotificationsResponseInterface> =>
    requestGql<ReadAllNotificationsResponseInterface>(request, thunkApi, 'markAllAsReadNotification'),
);
