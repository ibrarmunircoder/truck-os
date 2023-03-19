import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'modules/common/hooks';
import { MessageCenterScreenEnum } from 'modules/message-center';
import {
  ConversationListPartial,
  ConversationMembersScreenPartial,
  CreateConversationScreenPartial,
  SelectedConversationMessageHistoryPartial,
  SelectedConversationTopBarPartial,
  SelectedConverstaionInputAreaPartial,
} from 'modules/message-center/components/message-center-chat/partials';
import { BodyLayoutPartial } from 'modules/message-center/components/message-center-chat/partials/body-layout/body-layout.partial';
import { ConversationMembersScreenModeEnum } from 'modules/message-center/components/message-center-chat/partials/conversation-members-screen/conversation-members-screen.partial';
import { ConversationNotSelectedScreenPartial } from 'modules/message-center/components/message-center-chat/partials/conversation-not-selected-screen/conversation-not-selected-screen.partial';
import { HeadingPartial } from 'modules/message-center/components/message-center-chat/partials/heading/heading.partial';
import { useMessageCenterChatStyles } from 'modules/message-center/components/message-center-chat/partials/message-center-chat/message-center-chat.styles';
import {
  useConversationDetails,
  useCurrentUser,
  useMessageCenter,
  useMessageCenterChatProvider,
  useMessageCenterChatRouter,
  useMessageCenterScreen,
  useSelectedConversation,
} from 'modules/message-center/hooks';
import { FunctionComponent, useLayoutEffect } from 'react';

export type MessageCenterChatSubpageType = 'newConversation' | 'conversation' | 'conversationAddMembers' | 'conversationRemoveMembers';

export interface MessageCenterChatInterface {
  initialId?: string;
  initialSubpage?: MessageCenterChatSubpageType;
}

export const MessageCenterChat: FunctionComponent<MessageCenterChatInterface> = ({ initialId, initialSubpage }) => {
  const { t } = useTranslation();
  const classes = useMessageCenterChatStyles();
  const { id: userId } = useCurrentUser();
  useMessageCenterChatProvider(userId);

  const { clientId } = useMessageCenter();
  const { navigateToNewConversation, navigateToInitial } = useMessageCenterChatRouter();
  const { screen, set: setNextScreen } = useMessageCenterScreen();
  const { select: selectConversation, selected: selectedConversation } = useSelectedConversation();
  const { load: loadConversationDetails } = useConversationDetails();

  useLayoutEffect(() => {
    if (clientId) {
      if (initialId && !(selectedConversation?.id === initialId)) {
        let screenAfterLoad = MessageCenterScreenEnum.CONVERSATION_SELECTED;

        if (initialSubpage === 'conversationAddMembers') {
          screenAfterLoad = MessageCenterScreenEnum.CONVERSATION_ADD_MEMBERS;
        }
        if (initialSubpage === 'conversationRemoveMembers') {
          screenAfterLoad = MessageCenterScreenEnum.CONVERSATION_REMOVE_MEMBERS;
        }
        loadConversationDetails(initialId, () => {
          setNextScreen(screenAfterLoad);
        });
      }
    }

    if (initialSubpage === 'newConversation') {
      setNextScreen(MessageCenterScreenEnum.CREATE_NEW);
    }

    return () => {
      selectConversation(null);
      setNextScreen(MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED);
    };
  }, [clientId]);

  const handleCreateConversationClick = () => {
    navigateToNewConversation();
    selectConversation(null);
    setNextScreen(MessageCenterScreenEnum.CREATE_NEW);
  };

  const mobileScreenSidebarVisible = screen === MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED;

  const handleMobileBackClick = () => {
    navigateToInitial();
    selectConversation(null);
    setNextScreen(MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED);
  };

  return (
    <Box className={classes.root}>
      <HeadingPartial
        classes={classes.heading}
        title={t('chat-title')}
        backButton={!mobileScreenSidebarVisible}
        onBackClick={handleMobileBackClick}
      >
        <Button
          startIcon={<AddCircleOutlineIcon />}
          color="primary"
          variant="contained"
          onClick={handleCreateConversationClick}
          classes={classes.createButton}
        >
          <span className={classes.createNewButtonLabel}>{t('create-new')}</span>
          <span className={classes.createNewShortButtonLabel}>{t('new')}</span>
        </Button>
      </HeadingPartial>
      {screen === MessageCenterScreenEnum.CREATE_NEW ? (
        <CreateConversationScreenPartial />
      ) : (
        <BodyLayoutPartial aside={<ConversationListPartial />}>
          {screen === MessageCenterScreenEnum.CONVERSATION_SELECTED && selectedConversation && (
            <>
              <SelectedConversationTopBarPartial />
              <SelectedConversationMessageHistoryPartial />
              <SelectedConverstaionInputAreaPartial />
            </>
          )}
          {screen === MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED && <ConversationNotSelectedScreenPartial />}
          {screen === MessageCenterScreenEnum.CONVERSATION_ADD_MEMBERS &&
            <ConversationMembersScreenPartial mode={ConversationMembersScreenModeEnum.ADD}/>
          }
          {screen === MessageCenterScreenEnum.CONVERSATION_REMOVE_MEMBERS &&
            <ConversationMembersScreenPartial mode={ConversationMembersScreenModeEnum.REMOVE}/>
          }
        </BodyLayoutPartial>
      )}
    </Box>
  );
};
