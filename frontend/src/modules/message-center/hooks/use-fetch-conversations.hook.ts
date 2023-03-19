import { gql } from '@apollo/client';
import {
  fetchMoreConversationsRequest,
  fetchMoreConversationsSuccess,
  fetchUsersAction,
  MessageCenterConversationInterface,
  resetUsers,
} from 'modules/message-center';
import { useCurrentUser, useMessageCenter, useMessageCenterSocket } from 'modules/message-center/hooks';
import { conversationSchema } from 'modules/message-center/schemas';
import { conversationSelector } from 'modules/message-center/selectors';
import {
  ConversationListRequestPayloadInterface,
  ConversationListResponsePayloadInterface,
} from 'modules/message-center/utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface UseFetchConversationsHookInterface {
  isLoading: boolean;
  hasMore: boolean;
  filter: string;
  fetchMore: () => void;
  search: (nextFilter: string) => void;
}

export const useFetchConversations = (): UseFetchConversationsHookInterface => {
  const [socket] = useMessageCenterSocket();
  const { id: userId } = useCurrentUser();
  const dispatch = useDispatch();
  const { isOnline } = useMessageCenter();
  const { isLoading, hasMore, limit, loadedTotal, filter } = useSelector(conversationSelector);

  const handleFetchMoreConversationsResponse = (payload: ConversationListResponsePayloadInterface) => {
    const { data, totalCount } = payload;

    dispatch(
      fetchMoreConversationsSuccess({
        data: data.map((conversation: MessageCenterConversationInterface) =>
          conversationSchema(conversation, { userId }),
        ),
        totalCount,
      }),
    );
  };

  const handleFetchMoreConversations = (query: ConversationListRequestPayloadInterface) => {
    dispatch(fetchMoreConversationsRequest(query));
    socket.conversationList(query, handleFetchMoreConversationsResponse);
  };

  const fetchMore = () => {
    if (isLoading && !hasMore) {
      return;
    }

    handleFetchMoreConversations({
      offset: loadedTotal,
      limit,
      filter,
      includeArchived: false,
    });
  };

  const search = (nextFilter: string) => {
    const query = {
      offset: 0,
      limit,
      filter: nextFilter,
      includeArchived: false,
    };

    handleFetchMoreConversations(query);

    if (filter === '') {
      dispatch(resetUsers());
    } else {
      void dispatch(
        fetchUsersAction({
          variables: { limit, offset: 0 },
          query: gql`
            query getUsers() {
              users {
                data {
                  id
                  avatar
                  firstName
                  lastName
                  fullName
                  initials
                }
              }
            }
          `,
        }),
      );
    }
  };

  useEffect(() => {
    if (isOnline) {
      fetchMore();
    }
  }, [isOnline]);

  return {
    filter,
    isLoading,
    hasMore,
    fetchMore,
    search,
  };
};
