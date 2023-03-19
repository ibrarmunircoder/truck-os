import { publicConfig } from 'configuration/app';
import { AppDispatch } from 'configuration/redux/store';
import subDays from 'date-fns/subDays';
import { fetchNotificationNextPageQuery, fetchNotificationQuery } from 'modules/notifications/gql';
import {
  fetchNotificationsAction,
  fetchNotificationsNextPageAction,
  fetchNotificationsToggleAction,
} from 'modules/notifications/notifications.slice';
import { notificationsSelector } from 'modules/notifications/selectors';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseNotificationsLoaderHookParams {
  userId: string;
}
export interface UseNotificationsLoaderInterface {
  fetchOlderNotifications: () => void;
  fetchUnreadNotifications: () => void;
  fetchAllNotifications: () => void;
}
interface LoadNotificationsInterface {
  notificationsFromDate: Date;
  unreadNotificationsFromDate: Date;
}

export const useNotificationsLoader = ({
  userId,
}: UseNotificationsLoaderHookParams): UseNotificationsLoaderInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, isNotificationsLoading, unreadToggle } = useSelector(notificationsSelector);
  const minDate = subDays(new Date(), publicConfig.frontend.notificationMaxAgeDays);
  const loadNotifications = useCallback(
    ({ notificationsFromDate, unreadNotificationsFromDate }: LoadNotificationsInterface) => {
      void dispatch(
        fetchNotificationsAction({
          query: fetchNotificationQuery,
          variables: {
            limit: publicConfig.frontend.notificationFirstLoadCount,
            order: { order: 'DESC', sort: 'createdAt' },
            notificationfilter: unreadToggle
              ? {
                  createdAt: { moreThan: notificationsFromDate },
                  read: {
                    equalTo: false,
                  },
                }
              : { createdAt: { moreThan: notificationsFromDate } },
            unreadCountFilter: { createdAt: { moreThan: unreadNotificationsFromDate }, read: { equalTo: false } },
          },
          context: { service: 'platform' },
        }),
      );
    },
    [dispatch],
  );

  const fetchUnreadNotifications = useCallback(() => {
    void dispatch(
      fetchNotificationsToggleAction({
        query: fetchNotificationQuery,
        variables: {
          limit: publicConfig.frontend.notificationFirstLoadCount,
          order: { order: 'DESC', sort: 'createdAt' },
          notificationfilter: { createdAt: { moreThan: minDate }, read: { equalTo: false } },
          unreadCountFilter: { createdAt: { moreThan: minDate }, read: { equalTo: false } },
        },
        context: { service: 'platform' },
      }),
    );
  }, [dispatch]);

  const fetchAllNotifications = useCallback(() => {
    void dispatch(
      fetchNotificationsToggleAction({
        query: fetchNotificationQuery,
        variables: {
          limit: publicConfig.frontend.notificationFirstLoadCount,
          order: { order: 'DESC', sort: 'createdAt' },
          notificationfilter: { createdAt: { moreThan: minDate } },
          unreadCountFilter: { createdAt: { moreThan: minDate }, read: { equalTo: false } },
        },
        context: { service: 'platform' },
      }),
    );
  }, [dispatch]);

  const fetchOlderNotifications = useCallback(() => {
    const showMoreCreatedAt = {
      moreThan: subDays(new Date(), publicConfig.frontend.notificationMaxAgeDays),
      lessThan: notifications[notifications.length - 1].createdAt,
    };
    void dispatch(
      fetchNotificationsNextPageAction({
        query: fetchNotificationNextPageQuery,
        variables: {
          limit: publicConfig.frontend.notificationPageSize,
          order: { order: 'DESC', sort: 'createdAt' },
          filter: unreadToggle
            ? {
                createdAt: showMoreCreatedAt,
                read: {
                  equalTo: false,
                },
              }
            : {
                createdAt: showMoreCreatedAt,
              },
        },
        context: { service: 'platform' },
      }),
    );
  }, [notifications, dispatch]);

  useEffect(() => {
    if (userId && !notifications.length && !isNotificationsLoading)
      loadNotifications({ notificationsFromDate: minDate, unreadNotificationsFromDate: minDate });
  }, []);

  useEffect(() => {
    let intervalId;
    if (userId && !isNotificationsLoading) {
      intervalId = setInterval(
        () =>
          !notifications.length
            ? loadNotifications({ notificationsFromDate: minDate, unreadNotificationsFromDate: minDate })
            : loadNotifications({
                notificationsFromDate: notifications[0].createdAt,
                unreadNotificationsFromDate: minDate,
              }),
        publicConfig.frontend.notificationPollingDelaySeconds * 1000,
      );
    }

    return () => clearInterval(intervalId);
  }, [notifications]);

  return { fetchOlderNotifications, fetchUnreadNotifications, fetchAllNotifications };
};
