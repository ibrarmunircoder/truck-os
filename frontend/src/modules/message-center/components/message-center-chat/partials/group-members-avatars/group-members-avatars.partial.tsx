import AvatarGroup from '@mui/material/AvatarGroup';
import { MessageCenterConversationMemberInterface } from 'modules/message-center';
import { MemberAvatarPartial } from 'modules/message-center/components/message-center-chat/partials';
import { useGroupMembersAvatarsStyles } from 'modules/message-center/components/message-center-chat/partials/group-members-avatars/group-members-avatars.styles';
import React, { FunctionComponent, HTMLAttributes } from 'react';

export interface GroupMembersAvatarsInterface extends HTMLAttributes<HTMLDivElement> {
  members: MessageCenterConversationMemberInterface[];
  memberIds?: string[];
  ignoreMemberId?: string;
  maxCount?: number;
  showPresence?: boolean;
}

export const GroupMembersAvatarsPartial: FunctionComponent<GroupMembersAvatarsInterface> = ({
  members,
  maxCount = 3,
  showPresence,
}) => {
  const classes = useGroupMembersAvatarsStyles();
  const avatars = (members ?? []).map((member) => (
    <MemberAvatarPartial
      key={member.id}
      classes={classes.memberAvatar}
      showPresence={showPresence}
      size="large"
      member={member}
    />
  ));

  return (
    <AvatarGroup max={maxCount} classes={classes.avatarGroup}>
      {avatars}
    </AvatarGroup>
  );
};
