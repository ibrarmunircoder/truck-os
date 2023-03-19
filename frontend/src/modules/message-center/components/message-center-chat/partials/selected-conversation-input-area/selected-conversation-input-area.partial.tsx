import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import _uniq from 'lodash/uniq';
import { AdvancedMessageTextareaPartial } from 'modules/message-center/components/message-center-chat/partials';
import { useSelectedConversationInputAreaStyles } from 'modules/message-center/components/message-center-chat/partials/selected-conversation-input-area/selected-conversation-input-area.styles';
import {
  useCreateConversation,
  useEditMessage,
  useFetchConversations,
  useMessageCenterScreen,
  useNewMessageInput,
  useSelectedConversation,
  useSendMessage,
} from 'modules/message-center/hooks';
import {
  CreateConversationRequestPayloadInterface,
  SendMessageRequestPayloadInterface,
} from 'modules/message-center/utils';
import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';

const extractMentions = (text: string): string[] => {
  const mentions = [];

  text.replace(/\@\[(([^\:]*):([^\]]*))]/g, (match, userLink) => {
    const [id] = userLink.split(':');
    mentions.push(id);
    return '';
  });

  return mentions;
};

export interface SelectedConversationInputAreaInterface extends HTMLAttributes<HTMLDivElement> {}

export const SelectedConverstaionInputAreaPartial: FunctionComponent<SelectedConversationInputAreaInterface> = () => {
  const classes = useSelectedConversationInputAreaStyles();
  const { screen, isConversationSelected } = useMessageCenterScreen();
  const { selected: selectedConversation } = useSelectedConversation();
  const { search } = useFetchConversations();
  const { create: createConversation } = useCreateConversation();
  const { send: sendMessage } = useSendMessage();
  const {
    value: body,
    isEmpty: isNewMessageEmpty,
    ref: textareaRef,
    change: changeTextarea,
    focus: focusTextarea,
    blur: blurTextarea,
    clear: clearTextarea,
    reset: resetTextarea,
  } = useNewMessageInput('<p></p>');

  const { id: editMessageId, isEditing, value: editingValue, edit: editMessage, endEditing } = useEditMessage();

  const [previousValue, setPreviousValue] = useState(body);

  const safeFocusTextarea = () => {
    window.requestAnimationFrame(() => {
      focusTextarea();
    });
  };

  useEffect(() => {
    if (!isEditing) {
      changeTextarea(previousValue);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing && editingValue) {
      setPreviousValue(body);
      changeTextarea(editingValue);
    }
  }, [editMessageId, isEditing, editingValue]);

  const resetSearchUser = () => search('');

  const handleMessageSendClick = () => {
    const mentionedIds = extractMentions(body);

    if (selectedConversation.isNew) {
      const conversation: CreateConversationRequestPayloadInterface = {
        title: selectedConversation.title,
        memberIds: _uniq([...selectedConversation.memberIds, ...mentionedIds]),
        firstMessage: body,
      };

      createConversation(conversation);
      resetSearchUser();
      resetTextarea();
      return;
    }

    const message: SendMessageRequestPayloadInterface = {
      body,
      conversationId: selectedConversation?.id,
    };

    if (mentionedIds.length) {
      message.mentionedIds = mentionedIds;
    }

    if (isEditing) {
      editMessage(message);
      endEditing(editMessageId);
    } else {
      sendMessage(message);
    }

    resetTextarea();
  };

  const handleEnterPush = () => {
    if (isNewMessageEmpty) {
      return;
    }

    blurTextarea();
    handleMessageSendClick();
  };

  useEffect(() => {
    if (isConversationSelected) {
      clearTextarea();

      safeFocusTextarea();
    }
  }, [screen, selectedConversation]);

  useEffect(
    () => () => {
      blurTextarea();
    },
    [],
  );

  return (
    <Box className={classes.wrapper}>
      <AdvancedMessageTextareaPartial
        className={classes.textarea}
        forwardedRef={textareaRef}
        value={body}
        onChange={changeTextarea}
        onEnter={handleEnterPush}
      />
      <Button
        className={classes.sendButton}
        variant="contained"
        color="primary"
        tabIndex={2}
        onClick={handleMessageSendClick}
        disabled={isNewMessageEmpty}
        sx={{ minWidth: 52, minHeight: 36 }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
};
