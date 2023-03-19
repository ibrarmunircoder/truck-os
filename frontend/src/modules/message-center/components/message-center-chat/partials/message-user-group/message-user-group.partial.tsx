import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import { TimeAgo } from 'modules/date-time/components';
import { MessageCenterConversationMemberInterface, MessageCenterMessageInterface } from 'modules/message-center';
import {
  FormattedMessageItemPartial,
  MemberAvatarPartial,
} from 'modules/message-center/components/message-center-chat/partials';
import { useMessageUserGroupStyles } from 'modules/message-center/components/message-center-chat/partials/message-user-group/message-user-group.styles';
import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';

export interface MessageUserGroupItemInterface extends HTMLAttributes<HTMLDivElement> {
  isAuthor?: boolean;
  author: MessageCenterConversationMemberInterface;
  messages: MessageCenterMessageInterface[];
}

export const MessageUserGroupItemPartial: FunctionComponent<MessageUserGroupItemInterface> = ({
  messages,
  isAuthor,
  author,
  ...rest
}) => {
  const { t } = useTranslation();
  const classes = useMessageUserGroupStyles(useMemo(() => ({ isAuthor }), [isAuthor]));
  const lastMessageIndex = messages.length - 1;

  return (
    <div className={classes.wrapper} {...rest}>
      <div className={classes.avatarWrapper}>
        <MemberAvatarPartial classes={classes.avatar} member={author} size="normal" />
      </div>
      <List className={classes.messagesList} disablePadding>
        {messages.map((message, messageIndex) => {
          const isFirst = messageIndex === 0;
          const isDeleted = !!message.deletedAt;
          const isUpdated = !isDeleted && !!message.bodyUpdatedAt;
          const showTimestamp = messageIndex === lastMessageIndex && !!message.createdAt;
          const body = message.deletedAt ? t('message.deleted') : message.body;

          return (
            <>
              <ListItem disableGutters key={message.id}>
                <FormattedMessageItemPartial
                  key={message.id}
                  id={message.id}
                  body={body}
                  isSent={message.isAuthor}
                  isFirst={isFirst}
                  isDeleted={isDeleted}
                />
              </ListItem>
              {(isUpdated || showTimestamp) && (
                <ListItem className={classes.footer} disablePadding>
                  {showTimestamp && (
                    <Typography variant="body2" classes={classes.dateText}>
                      <TimeAgo date={message.createdAt} />
                    </Typography>
                  )}
                  {isUpdated && (
                    <Typography variant="body2" classes={classes.dateText}>
                      {t('message.edited')}
                    </Typography>
                  )}
                </ListItem>
              )}
            </>
          );
        })}
      </List>
    </div>
  );
};
