import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { RecipientListPartial } from 'modules/message-center/components/message-center-chat/partials';
import { useCreateConversationScreenStyles } from "modules/message-center/components/message-center-chat/partials/create-conversation-screen/create-conversation-screen.styles";
import {
  useFetchRecipients,
  useInviteConversationMembers,
  useMessageCenterChatRouter,
  useMessageCenterScreen,
  useSelectedConversation,
  useSelectRecipients,
} from 'modules/message-center/hooks';
import { MessageCenterScreenEnum } from 'modules/message-center/message-center.slice';
import React, { FunctionComponent, HTMLAttributes, useEffect, useMemo } from 'react';

export enum ConversationMembersScreenModeEnum {
  ADD = 'add',
  REMOVE = 'remove',
}

export interface ConversationMembersScreenInterface extends HTMLAttributes<HTMLDivElement> {
  mode: ConversationMembersScreenModeEnum;
}

export const ConversationMembersScreenPartial: FunctionComponent<ConversationMembersScreenInterface> = ({ mode }) => {
  const recipientsPerPage = 20;
  const { t } = useTranslation();
  const messageRouter = useMessageCenterChatRouter();
  const { clear, initialFetch } = useFetchRecipients();
  const { selected: selectedConversation } = useSelectedConversation();
  const { selectedIds, selectMany } = useSelectRecipients();
  const { set: setNextScreen } = useMessageCenterScreen();
  const { updateConversationMembers } = useInviteConversationMembers();
  const classes = useCreateConversationScreenStyles();

  const handleCancelClick = () => {
    setNextScreen(MessageCenterScreenEnum.CONVERSATION_SELECTED);
    messageRouter.navigateToConversation(selectedConversation.id);
  };

  const handleSaveClick = async () => {
    updateConversationMembers(
      selectedConversation.id,
      mode === ConversationMembersScreenModeEnum.REMOVE
        ? selectedIds
        : selectedIds.concat(selectedConversation.memberIds),
    );
    setNextScreen(MessageCenterScreenEnum.CONVERSATION_SELECTED);
    messageRouter.navigateToConversation(selectedConversation.id);
  };

  useEffect(() => {
    selectMany(selectedConversation.memberIds);
    initialFetch({
      limit: recipientsPerPage,
      ...(mode === ConversationMembersScreenModeEnum.REMOVE ? { ids: selectedConversation.memberIds } : null),
      ...(mode === ConversationMembersScreenModeEnum.ADD ? { excludeIds: selectedConversation.memberIds } : null),
    });

    return () => {
      clear();
    };
  }, []);

  const removeMemberDisabled = useMemo(() => selectedIds.length < 2, [selectedIds]);

  const addMemberDisabled = useMemo(() => selectedIds.filter(value => !selectedConversation.memberIds.includes(value)).length < 1, [selectedIds]);

  const shouldShowFormAlert = selectedConversation.isGroup && (
    mode === ConversationMembersScreenModeEnum.REMOVE
    && removeMemberDisabled
  );

  const removeMode = useMemo(() => mode === ConversationMembersScreenModeEnum.REMOVE, [mode]);

  return (
    <Box display="flex" flexDirection="column" padding={3} justifyContent="space-between" height="100%">
      <Box maxHeight={96}>
        <Typography variant="h4" className={classes.title}>
          {removeMode
            ? t('remove-members-screen-title')
            : t('add-members-screen-title')}
        </Typography>
      </Box>
      <RecipientListPartial className={classes.list} initialLoad={false} />
      <Box className={classes.buttonBox} display="flex" gap={2} justifyContent="flex-end">
        <Button className={classes.chooseButton} color="primary" variant="outlined" onClick={handleCancelClick}>
          {t('message-center.new-conversation.cancelBtnTitle')}
        </Button>
        <Button
          className={classes.chooseButton}
          color="primary"
          variant="contained"
          disabled={
            removeMode ? removeMemberDisabled : addMemberDisabled
          }
          onClick={handleSaveClick}
        >
          {removeMode ? t('remove') : t('add')}
        </Button>
      </Box>
      {shouldShowFormAlert && (
        <FormAlert
          open
          error={new Error(t('select-one-warning'))}
          autoHideDuration={3000}
        />
      )}
    </Box>
  );
};
