import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TRANSLATION_MAPPING } from 'configuration/common/translation-mapping';
import _uniq from 'lodash/uniq'
import { useTranslation } from 'modules/common/hooks';
import { BodyLayoutPartial } from 'modules/message-center/components/message-center-chat/partials/body-layout/body-layout.partial';
import { useCreateConversationScreenStyles } from 'modules/message-center/components/message-center-chat/partials/create-conversation-screen/create-conversation-screen.styles';
import { RecipientListPartial } from 'modules/message-center/components/message-center-chat/partials/recipient-list/recipient-list.partial'
import {
  useCreateConversation,
  useCurrentUser,
  useFetchRecipients,
  useMessageCenterChatRouter,
  useMessageCenterScreen,
  useSelectRecipients
} from 'modules/message-center/hooks'
import { MessageCenterScreenEnum } from 'modules/message-center/message-center.slice';
import { CreateConversationRequestPayloadInterface } from 'modules/message-center/utils';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';

export interface CreateConversationScreenInterface extends HTMLAttributes<HTMLDivElement> { }

export const CreateConversationScreenPartial: FunctionComponent<CreateConversationScreenInterface> = () => {
  const { t } = useTranslation();

  const { id: userId } = useCurrentUser();
  const { create: createConversation } = useCreateConversation();
  const { clear } = useFetchRecipients();
  const { selectedIds } = useSelectRecipients();
  const { set: setNextScreen } = useMessageCenterScreen();
  const { navigateToInitial } = useMessageCenterChatRouter();

  const handleCancelClick = () => {
    setNextScreen(MessageCenterScreenEnum.CONVERSATION_NOT_SELECTED);
    navigateToInitial();
  };

  const handleChooseClick = async () => {
    const conversation: CreateConversationRequestPayloadInterface = {
      title: t(TRANSLATION_MAPPING[selectedIds.length > 1 ? "GROUP_CHAT" : "CHAT"]),
      memberIds: _uniq([userId, ...selectedIds]),
    };

    createConversation(conversation);
  };

  useEffect(
    () => () => {
      clear();
    },
    [],
  );

  const chooseDisabled = selectedIds.length === 0;
  const classes = useCreateConversationScreenStyles();

  return (
    <BodyLayoutPartial>
      <Box className={classes.recipientBox}>
        <Typography variant="h6" className={classes.title}>
          {t('choose-recipient-title')}
        </Typography>
        <RecipientListPartial className={classes.recipientList} />
        <Box className={classes.buttonBox}>
          <Button color="primary" variant="outlined" onClick={handleCancelClick} className={classes.chooseButton}
          >
            {t('message-center.new-conversation.cancelBtnTitle')}
          </Button>
          <Button color="primary" variant="contained" disabled={chooseDisabled} onClick={handleChooseClick} className={classes.chooseButton}
          >
            {t('add')}
          </Button>
        </Box>
      </Box>
    </BodyLayoutPartial>
  );
};
