/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-shadow */
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useMenu, useTranslation } from 'modules/common/hooks';
import {
  MessageCenterConversationEditingTypeEnum,
  MessageCenterConversationMemberInterface,
} from 'modules/message-center';
import {
  ConversationMenuPartial,
  GroupMembersAvatarsPartial,
  RenameConversationFormPartial,
} from 'modules/message-center/components/message-center-chat/partials';
import { useSelectedConversationTopBarStyles } from 'modules/message-center/components/message-center-chat/partials/selected-conversation-top-bar/selected-conversation-top-bar.styles';
import { useCurrentUser, useRenameConversation, useSelectedConversation } from 'modules/message-center/hooks';
import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

export interface SelectedConversationTopBarInterface extends HTMLAttributes<HTMLDivElement> {}

const formatOnlineStatus = ({ fullName }: MessageCenterConversationMemberInterface): ReactNode => (
  <span>{fullName}</span>
);

export const sortMembers = (members: MessageCenterConversationMemberInterface[], userId: string) => {
  if (!members) {
    return [];
  }

  return [...members].sort(({ id }) => (id === userId ? 1 : -1));
};

const formatGroupMembers = (
  members: MessageCenterConversationMemberInterface[],
  ownerId: string,
  ownerLabel: string,
  membersLabel: string,
): ReactNode => (
  <>
    <span>{members.length} {membersLabel}: </span>
    {members.map((member, index) => (
      <span key={index}>
        <span>
          {formatOnlineStatus(member)}
          {member.id === ownerId && `(${ownerLabel})`}
        </span>
        {index !== members.length - 1 && <span>{`, `}</span>}
      </span>
    ))}
  </>
);

export const SelectedConversationTopBarPartial: FunctionComponent<SelectedConversationTopBarInterface> = () => {
  const { t } = useTranslation();
  const classes = useSelectedConversationTopBarStyles();
  const { anchorElement, setAnchorElement, onClose } = useMenu();
  const { id: userId } = useCurrentUser();
  const { selected: selectedConversation } = useSelectedConversation();

  const { title, id: conversationId, isGroup, ownerId, isEditing, members = [] } = selectedConversation;
  const { type: editingType, endEditing, rename: renameConversation } = useRenameConversation();

  if (!selectedConversation) {
    return null;
  }

  const isAdmin = ownerId === userId;
  const sortedMembers = isGroup ? sortMembers(members, userId) : members.filter(({ id }) => id !== userId);
  const conversationTitle = isGroup ? title : sortedMembers[0]?.fullName;

  const handleRenameSubmit = ({ title }) => {
    renameConversation(title);
    endEditing(conversationId);
  };

  const handleRenameCancel = () => {
    endEditing(conversationId);
  };

  const actions = isGroup && (
    <>
      <IconButton onClick={(e) => setAnchorElement(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>

      <ConversationMenuPartial
        id={conversationId}
        location={MessageCenterConversationEditingTypeEnum.TOPBAR}
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </>
  );

  const editForm = isAdmin && isEditing && editingType === MessageCenterConversationEditingTypeEnum.TOPBAR && (
    <RenameConversationFormPartial
      defaultTitle={conversationTitle}
      onSubmit={handleRenameSubmit}
      onCancel={handleRenameCancel}
    />
  );

  return (
    <Paper classes={classes.paper} square elevation={0}>
      {editForm || (
        <CardHeader
          classes={classes.cardHeader}
          avatar={<GroupMembersAvatarsPartial members={members} showPresence />}
          title={conversationTitle}
          titleTypographyProps={{ variant: 'subtitle2' }}
          subheader={formatGroupMembers(members, userId, t('owner'), t('members'))}
          action={actions && <div className={classes.actions}>{actions}</div>}
        />
      )}
    </Paper>
  );
};
