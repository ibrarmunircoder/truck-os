import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import _noop from 'lodash/fp/noop';
import { useRipple } from 'modules/common/hooks';
import { TimeAgo } from 'modules/date-time/components';
import { MessageCenterConversationMemberInterface } from 'modules/message-center';
import { useConversationCardStyles } from 'modules/message-center/components/message-center-chat/partials/conversation-card/conversation-card.styles';
import { GroupMembersAvatarsPartial } from 'modules/message-center/components/message-center-chat/partials/group-members-avatars/group-members-avatars.partial';
import React, { FunctionComponent, HTMLAttributes, MouseEventHandler, ReactEventHandler, ReactNode } from 'react';

export interface ConversationCardProps extends HTMLAttributes<HTMLElement> {
  selected?: boolean;
  members: MessageCenterConversationMemberInterface[];
  title: string;
  lastUpdateTimestamp?: Date;
  lastMessage?: ReactNode;
  unreadCount?: number;
  onClick?: ReactEventHandler<HTMLElement>;
  details?: ReactNode;
  actions?: ReactNode;
}

const formatCount = (count: number) => (count < 99 ? `${count}` : `${99}+`);

export const ConversationCardPartial: FunctionComponent<ConversationCardProps> = ({
  selected,
  members,
  title,
  lastUpdateTimestamp,
  lastMessage,
  unreadCount = 0,
  onClick = _noop,
  onMouseDown,
  actions,
  children,
}) => {
  const hasUnreadMessages = unreadCount > 0;

  const classes = useConversationCardStyles({ selected });

  const { addRipple, ripples } = useRipple({});
  const handleMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    addRipple(event);
    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  return (
    <Card raised={!selected} classes={classes.card} onMouseDown={handleMouseDown} onClick={onClick}>
      {ripples}
      {children || (
        <>
          <CardHeader
            classes={classes.cardHeader}
            avatar={<GroupMembersAvatarsPartial members={members} />}
            title={title}
            titleTypographyProps={{ variant: 'subtitle2' }}
            subheader={<TimeAgo date={lastUpdateTimestamp} />}
            action={
              <>
                {actions && <div className={classes.actions}>{actions}</div>}
                {hasUnreadMessages && <Badge classes={classes.unreadBadge} badgeContent={formatCount(unreadCount)} />}
              </>
            }
          />
          <CardContent classes={classes.cardContent}>
            {lastMessage && (
              <Typography classes={classes.lastMessage} component="div" variant="body2">
                {lastMessage}
              </Typography>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};
