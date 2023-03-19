import Avatar, { AvatarProps } from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { MessageCenterConversationMemberInterface } from 'modules/message-center';
import { useMemberAvatarStyles } from 'modules/message-center/components/message-center-chat/partials/member-avatar/member-avatar.styles';
import { FunctionComponent, useMemo } from 'react';

const sizeSxMap = {
  small: { width: 12, height: 12, fontSize: '0.5rem', pt: '1px' },
  normal: { width: 40, height: 40 },
  large: { width: 48, height: 48 },
};

export interface MemberAvatarInterface extends AvatarProps {
  size?: keyof typeof sizeSxMap;
  member: MessageCenterConversationMemberInterface;
  showPresence?: boolean;
}

export const MemberAvatarPartial: FunctionComponent<MemberAvatarInterface> = ({ size = 'normal', member, ...rest }) => {
  const classes = useMemberAvatarStyles(rest);
  const { fullName, initials, avatar } = member ?? {};
  const sx = useMemo(() => sizeSxMap[size], [size]);

  return (
    <Tooltip title={fullName}>
      <Avatar {...rest} classes={classes.avatar} src={avatar} alt={fullName} sx={sx}>
        {initials}
      </Avatar>
    </Tooltip>
  );
};
