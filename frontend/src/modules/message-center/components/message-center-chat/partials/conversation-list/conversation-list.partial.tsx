import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { LoadingSkeleton } from 'modules/common/components';
import { useCustomInfiniteScroll } from 'modules/common/hooks';
import { MessageCenterConversationInterface, MessageCenterScreenEnum } from 'modules/message-center';
import { useConversationListStyles } from 'modules/message-center/components/message-center-chat/partials/conversation-list/conversation-list.styles';
import { ConversationListItemPartial } from 'modules/message-center/components/message-center-chat/partials/conversation-list-item/conversation-list-item.partial';
import {
  useFetchConversations,
  useFetchMessages,
  useMessageCenterChatRouter,
  useMessageCenterScreen,
  useRenameConversation,
  useSelectedConversation,
} from 'modules/message-center/hooks';
import { selectAllConversations } from 'modules/message-center/selectors';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

export interface ConversationListInterface {}

export const ConversationListPartial: FunctionComponent<ConversationListInterface> = () => {
  const classes = useConversationListStyles();
  const { navigateToConversation } = useMessageCenterChatRouter();

  const { fetchMore, hasMore, filter, isLoading } = useFetchConversations();
  const { initialFetch } = useFetchMessages();
  const { selected: selectedConversation, select: selectConversation } = useSelectedConversation();
  const { set: setNextScreen } = useMessageCenterScreen();
  const { id: editingId, endEditing } = useRenameConversation();

  const conversations = useSelector(selectAllConversations);

  const onConversationClick = (conversation: MessageCenterConversationInterface) => () => {
    const conversationId = conversation.id;
    if (conversationId === selectedConversation?.id) {
      return;
    }

    if (editingId) {
      endEditing(editingId);
    }

    setNextScreen(MessageCenterScreenEnum.CONVERSATION_SELECTED);
    navigateToConversation(conversationId);
    selectConversation(conversation);

    if (conversation) {
      initialFetch(conversation.id);
    }
  };

  const {
    refs: [infiniteRef, { rootRef }],
  } = useCustomInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: fetchMore,
    rootMargin: '0px 0px 96px 0px', // list item height
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <Box ref={rootRef} className={classes.container}>
      <List classes={classes.list} disablePadding>
        {filter && (
          <Typography variant="h5" key="messages">
            Messages
          </Typography>
        )}

        {conversations.map((conversation, key) => (
          <ListItem disableGutters classes={classes.listItem} key={key}>
            <ConversationListItemPartial
              conversation={conversation}
              selected={conversation.id === selectedConversation?.id}
              onClick={onConversationClick(conversation)}
            />
          </ListItem>
        ))}

        {hasMore && (
          <ListItem ref={infiniteRef} classes={classes.loader}>
            <h4 key="loading">
              Loading...
            </h4>
          </ListItem>
        )}
      </List>
    </Box>
  );
};
