import { gql } from '@apollo/client';

export const fetchNotificationNextPageQuery = gql`
  query notificationWebs($limit: Int, $order: NotificationWebOrderArgType!, $filter: NotificationWebFilterArgType) {
    notificationWebs(limit: $limit, order: $order, filter: $filter) {
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
  }
`;
