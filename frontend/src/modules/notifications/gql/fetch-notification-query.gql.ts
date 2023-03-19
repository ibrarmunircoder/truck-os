import { gql } from '@apollo/client';

export const fetchNotificationQuery = gql`
  query notificationWebs(
    $limit: Int
    $order: NotificationWebOrderArgType!
    $notificationfilter: NotificationWebFilterArgType
    $unreadCountFilter: NotificationWebFilterArgType
  ) {
    loadNotifications: notificationWebs(limit: $limit, order: $order, filter: $notificationfilter) {
      totalCount
      data {
        id
        title
        content
        locale
        createdAt
        read
        icon
      }
    }
    loadUnreadNotificationCount: notificationWebs(limit: $limit, filter: $unreadCountFilter) {
      totalCount
    }
  }
`;
