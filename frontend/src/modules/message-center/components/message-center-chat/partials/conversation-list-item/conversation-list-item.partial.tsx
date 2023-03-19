/* eslint-disable @typescript-eslint/no-shadow */
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { useMenu } from 'modules/common/hooks';
import {
  ConversationMenuPartial,
  formatPreviewContent,
  RenameConversationFormPartial,
  sortMembers,
} from 'modules/message-center/components/message-center-chat/partials';
import { ConversationCardPartial } from 'modules/message-center/components/message-center-chat/partials/conversation-card/conversation-card.partial';
import { useConversationListItemStyles } from 'modules/message-center/components/message-center-chat/partials/conversation-list-item/conversation-list-item.style';
import { useCurrentUser, useRenameConversation } from 'modules/message-center/hooks';
import {
  MessageCenterConversationEditingTypeEnum,
  MessageCenterConversationInterface,
} from 'modules/message-center/message-center.slice';
import { FunctionComponent, HTMLAttributes, MouseEventHandler, ReactEventHandler, useRef } from 'react';

export interface ConversationListItemInterface extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean;
  conversation: MessageCenterConversationInterface;
  onClick?: ReactEventHandler<HTMLLIElement>;
}

export const ConversationListItemPartial: FunctionComponent<ConversationListItemInterface> = ({
  conversation: { id, title, lastMessage, lastMessageTimestamp, unreadCount, ownerId, isGroup, isEditing, members },
  selected,
  onClick,
  ...rest
}) => {
  const { onClose, setAnchorElement, anchorElement } = useMenu();
  const { id: userId } = useCurrentUser();
  const { type: editingType, rename: renameConversation, endEditing } = useRenameConversation();

  const isAdmin = ownerId === userId;
  const isEditingAtItemList = isAdmin && isEditing && editingType === MessageCenterConversationEditingTypeEnum.LIST;
  const isSelected = isEditingAtItemList ? false : selected;

  const actionsButtonRef = useRef<HTMLDivElement>();

  const sortedMembers = isGroup ? sortMembers(members, userId) : members.filter((member) => member.id !== userId);
  const conversationTitle = isGroup ? title : sortedMembers[0]?.fullName;

  const handleActionsClick = (e) => {
    if (anchorElement) {
      setAnchorElement(null);
    } else {
      setAnchorElement(e.currentTarget);
    }
  };

  const handleClick: ReactEventHandler<HTMLLIElement> = (event) => {
    if (actionsButtonRef?.current?.contains(event.target as Node)) {
      return;
    }
    onClick(event);
  };

  const handleActionsMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRenameSubmit = ({ title }) => {
    renameConversation(title);
    endEditing(id);
  };

  const handleRenameCancel = () => {
    endEditing(id);
  };

  const classes = useConversationListItemStyles();

  const actions = isGroup && !isEditingAtItemList && (
    <>
      <div ref={actionsButtonRef}>
        <IconButton onMouseDown={handleActionsMouseDown} onClick={handleActionsClick} classes={classes.iconDots}>
          <MoreHorizIcon />
        </IconButton>
      </div>

      <ConversationMenuPartial
        id={id}
        location={MessageCenterConversationEditingTypeEnum.LIST}
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

  const editForm = isEditingAtItemList && (
    <RenameConversationFormPartial
      defaultTitle={conversationTitle}
      onSubmit={handleRenameSubmit}
      onCancel={handleRenameCancel}
    />
  );

  return (
    <ConversationCardPartial
      members={members}
      title={conversationTitle}
      lastUpdateTimestamp={lastMessageTimestamp}
      lastMessage={lastMessage && formatPreviewContent(lastMessage.body)}
      unreadCount={unreadCount}
      selected={isSelected}
      actions={actions}
      onClick={handleClick}
      {...rest}
    >
      {editForm}
    </ConversationCardPartial>
  );
};
