import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import { useTranslation } from 'modules/common/hooks';
import { TimeAgo } from 'modules/date-time/components';
import { NotificationIcon } from 'modules/notifications/components/notification-icon';
import { useNotificationsListItemStyles } from 'modules/notifications/components/notifications-list-item/notifications-list-item.styles';
import { NotificationsInterface } from 'modules/notifications/notifications.slice';
import Link from 'next/link'
import React, { FunctionComponent, SyntheticEvent, useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export interface NotificationsListItemInterface extends NotificationsInterface {
  onRead?: (id: string) => void;
  onUnread?: (id: string) => void;
  timezone?: string | null;
}

const markdownComponents =
{
  a: ({ ...props }) => (
    <Link href={props.href as string} >
      <a style={{ color: '#4294f7' }}>
        {props.children[0]}
      </a>
    </Link>
  ),
}
export const NotificationsListItem: FunctionComponent<NotificationsListItemInterface> = ({
  id,
  title,
  content,
  createdAt,
  read,
  onRead,
  onUnread,
  icon
}) => {
  const classes = useNotificationsListItemStyles()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMoreButtonClick = useCallback(
    (event: SyntheticEvent) => {
      setAnchorEl(event.currentTarget);
      event.stopPropagation();
    },
    [setAnchorEl],
  );

  const handleMenuClose = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      setAnchorEl(null);
    },
    [setAnchorEl],
  );

  const handleClick = useCallback(() => {
    if (onRead) {
      onRead(id);
    }
  }, []);

  const handleReadToggle = useCallback(() => (read ? onUnread(id) : onRead(id)), [read, id, onRead, onUnread]);
  /*
    t('notification_mark-as-unread')
    t('notification_mark-as-read')
  */
  return (
    <Card classes={classes.card} raised onClick={handleClick}>
      <CardHeader
        classes={classes.cardHeader}
        title={
          <>
           <div className={classes.titleDiv}>
          <NotificationIcon icon={icon} />
           <Typography classes={classes.title} variant="body1">
            {title}
          </Typography>
          </div>
          </>
         
        }
        subheader= {
          <Typography classes={classes.subheader}>
              <TimeAgo date={createdAt} />
          </Typography>
        }
        action={
          <>
            <IconButton classes={classes.moreButton} onClick={handleMoreButtonClick}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleReadToggle}>
                <ListItemIcon>{read ? <RadioButtonUncheckedIcon /> : <CheckCircleOutlineIcon />}</ListItemIcon>

                <ListItemText primary={t('notification', { context: `${read ? 'mark-as-unread' : 'mark-as-read'}` })} />
              </MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent classes={classes.cardContent}>
        <Badge
          classes={classes.unreadBadge}
          color="error"
          variant="dot"
          invisible={read}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Typography classes={classes.content}>
            <ReactMarkdown
              components={markdownComponents}
            >{content}</ReactMarkdown>
          </Typography>
        </Badge>
      </CardContent>
    </Card>
  );
};
