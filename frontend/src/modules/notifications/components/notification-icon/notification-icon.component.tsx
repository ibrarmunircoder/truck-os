import dynamic from 'next/dynamic';
import React, { memo } from 'react';

export type NotificationIconProps = {
  icon: string;
}

const iconsMapping = {
  person: dynamic(() => import('@mui/icons-material/Person')),
  attachment: dynamic(() => import('@mui/icons-material/Attachment')),
  description: dynamic(() => import('@mui/icons-material/Description')),
  default: dynamic(() => import('@mui/icons-material/NotificationsOutlined'))
}

export const NotificationIcon = memo<NotificationIconProps>(({ icon }) => {
  const Icon = iconsMapping[icon] || iconsMapping.default
  return <Icon/>
})

NotificationIcon.displayName = 'NotificationIcon'
