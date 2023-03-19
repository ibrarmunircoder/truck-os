import {
  fetchMoreMessagesRequest,
  fetchMoreMessagesSuccess,
  MessageCenterMessageInterface,
} from 'modules/message-center';
import { useCurrentUser, useMessageCenterSocket } from 'modules/message-center/hooks';
import { messageSchema } from 'modules/message-center/schemas';
import { conversationSelector, messageSelector } from 'modules/message-center/selectors';
import {
  FetchMessagesRequestPayloadInterface,
  FetchMoreMessagesResponsePayloadInterface,
} from 'modules/message-center/utils';
import { useDispatch, useSelector } from 'react-redux';

export interface UseFetchMessagesHookInterface {
  isLoading: boolean;
  hasMore: boolean;
  loadedTotal: number;
  initialFetch: (conversationId: string) => void;
  fetchMore: () => void;
}

export const useFetchMessages = (): UseFetchMessagesHookInterface => {
  const [socket] = useMessageCenterSocket();
  const { id: userId } = useCurrentUser();
  const dispatch = useDispatch();
  const { isLoading, hasMore, limit, loadedTotal } = useSelector(messageSelector);
  const { selected: selectedConversation } = useSelector(conversationSelector);

  const handleFetchMoreMessagesResponse = (payload: FetchMoreMessagesResponsePayloadInterface) => {
    const { data, totalCount } = payload;

    dispatch(
      fetchMoreMessagesSuccess({
        data: data.map((message: MessageCenterMessageInterface) => messageSchema(message, { userId })),
        totalCount,
      }),
    );
  };

  const handleFetchMoreMessages = (payload: FetchMessagesRequestPayloadInterface) => {
    dispatch(fetchMoreMessagesRequest(payload));

    socket.messageList(payload, handleFetchMoreMessagesResponse);
  };

  const initialFetch = (conversationId: string) => {
    handleFetchMoreMessages({
      conversationId,
      limit,
      offset: 0,
    });
  };

  const fetchMore = () => {
    if (isLoading && !hasMore) {
      return;
    }

    handleFetchMoreMessages({
      conversationId: selectedConversation.id,
      limit,
      offset: loadedTotal,
    });
  };

  return {
    isLoading,
    hasMore,
    loadedTotal,
    initialFetch,
    fetchMore,
  };
};
