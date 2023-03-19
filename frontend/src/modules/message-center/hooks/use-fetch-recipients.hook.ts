import { gql } from '@apollo/client';
import { useAuth } from 'modules/auth/hooks';
import {
  clearRecipients,
  fetchRecipientsAction,
  fetchRecipientsRequest,
  MessageCenterUserInterface,
} from 'modules/message-center';
import { FetchRecipientsVariablesInterface } from 'modules/message-center/actions';
import { recipientSelector, selectAllRecipients } from 'modules/message-center/selectors';
import { useDispatch, useSelector } from 'react-redux';

export interface UseFetchRecipientsHookInterface {
  isLoading: boolean;
  hasMore: boolean;
  limit: number;
  filter: string;
  loadedTotal: number;
  totalCount: number;
  recipients: MessageCenterUserInterface[];
  clear: () => void;
  initialFetch: (params: FetchRecipientsVariablesInterface) => void;
  fetchMore: () => void;
}

export const useFetchRecipients = (): UseFetchRecipientsHookInterface => {
  const dispatch = useDispatch();
  const {
    user: { roqIdentifier: userId },
  } = useAuth();

  const {
    isLoading,
    hasMore,
    limit,
    filter,
    loadedTotal,
    filters: { ids, excludeIds, includeIds },
    totalCount,
  } = useSelector(recipientSelector);
  const recipients = useSelector(selectAllRecipients);

  const clear = () => {
    dispatch(clearRecipients());
  };

  const handleLoadMoreRecipients = (query: FetchRecipientsVariablesInterface) => {
    dispatch(fetchRecipientsRequest(query));

    void dispatch(
      fetchRecipientsAction({
        variables: {
          ...query,
        },
        query: gql`
          query getRecipients($limit: Int!, $offset: Int!, $ids: [ID!], $excludeIds: [ID!]) {
            users(
              limit: $limit
              offset: $offset
              filter: { roqIdentifier: { valueIn: $ids, valueNotIn: $excludeIds } }
            ) {
              data {
                id
                firstName
                lastName
                fullName
                initials
                roqIdentifier
                initials
                avatar
              }
              totalCount
            }
          }
        `,
      }),
    );
  };

  const initialFetch = (query: FetchRecipientsVariablesInterface) => {
    handleLoadMoreRecipients({
      ...query,
      offset: 0,
      excludeIds: [...(query?.excludeIds ?? []), userId],
    });
  };

  const fetchMore = () => {
    if (isLoading && !hasMore) {
      return;
    }
    handleLoadMoreRecipients({
      limit,
      offset: loadedTotal,
      ids,
      excludeIds,
      includeIds,
    });
  };

  return {
    recipients,
    isLoading,
    hasMore,
    limit,
    filter,
    loadedTotal,
    totalCount,
    initialFetch,
    fetchMore,
    clear,
  };
};
