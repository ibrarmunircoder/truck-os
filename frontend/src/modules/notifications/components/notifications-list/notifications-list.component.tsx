import CloseIcon from '@mui/icons-material/HighlightOff';
import { Badge, IconButton, Link as MuiLink, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import differenceInDays from 'date-fns/differenceInDays';
import { LoadingSkeleton } from "modules/common/components";
import { useTranslation } from 'modules/common/hooks';
import { useNotificationsListStyles } from 'modules/notifications/components/notifications-list/notifications-list.styles';
import { NotificationsListItem } from 'modules/notifications/components/notifications-list-item';
import { NotificationsInterface } from 'modules/notifications/notifications.slice';
import { Fragment, FunctionComponent, useEffect, useMemo, useState } from 'react';

export interface NotificationsListInterface {
  notifications: NotificationsInterface[];
  unreadCount: number;
  totalCount: number;
  isNotificationsLoading:boolean;
  isToggleLoading: boolean;
  refreshCount?: number;
  unreadToggle?:boolean;
  onClose: () => void;
  onReadItem: (id: string) => void;
  onUnreadItem: (id: string) => void;
  onReadAll: () => void;
  onShowMore: () => void;
  onFetchAll:() => void;
  onFetchUnread:() => void;
}

export const NotificationsList: FunctionComponent<NotificationsListInterface> = ({
  notifications,
  unreadCount = 0,
  totalCount = 0,
  refreshCount = 0,
  unreadToggle = false,
  onClose,
  onReadItem,
  onUnreadItem,
  onReadAll,
  onShowMore,
  onFetchAll,
  onFetchUnread,
  isNotificationsLoading,
  isToggleLoading
}) => {
  const { t } = useTranslation();
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (_event, newAlignment) => {
    if(!!newAlignment && alignment!==newAlignment) {
      if(newAlignment === 'left'){
        onFetchAll()
      } else{
        onFetchUnread()
      }
       setAlignment(newAlignment);
       
    }
   
  };
  useEffect(()=>{
    if(unreadToggle){
      setAlignment('right')
    }else{
      setAlignment('left')
    }
  },[])
  const notificationGroups = useMemo(() => {
    const groupedNotifications = notifications.reduce((acc, item) => {
      const sectionKey = differenceInDays(Date.now(), item.createdAt) < 1 ? 'recent' : 'older';
      if (!acc[sectionKey]) {
        acc[sectionKey] = [];
      }
      acc[sectionKey].push(item);
      return acc;
    }, {});

    /*
        t('notification-headline_recent')
        t('notification-headline_older')
      */

    return ['recent', 'older'].reduce((acc, groupName) => {
      const items = groupedNotifications[groupName];

      if (items?.length) {
        acc.push({
          groupName,
          items: (items as NotificationsInterface[]).sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1)),
        });
      }
      return acc;
    }, []);
  }, [notifications]);
  const classes = useNotificationsListStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <Badge classes={classes.unreadBadge} component="div" color="primary" badgeContent={unreadCount}>
          <Typography classes={classes.title} variant="h5">
            {t('notification')}
          </Typography>
        </Badge>
        <IconButton classes={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.actionItems}> 
          <div>
          <ToggleButtonGroup size="small"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton value="left" aria-label="left aligned">
      {t('notification-toggle-all')}
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
      {t('notification-toggle-unread')}
      </ToggleButton>
    </ToggleButtonGroup>
          </div>
          {notifications.length > 0 && (
            <div>
            <MuiLink className={classes.markAllRead} onClick={onReadAll} variant="caption">
                    {t('notification_mark-all-as-read')}
                  </MuiLink>
            </div>
          )}
          
      </div>
     {isToggleLoading? (<div className={classes.loadingBlock}>
       <LoadingSkeleton></LoadingSkeleton>
     </div>):(<div>
      {notificationGroups.length > 0 ? (
        notificationGroups.map(({ groupName, items }) => (
          <Fragment key={`timestamp-${groupName}`}>
            <div key={`timestamp-${groupName}`} className={classes.headline}>
              <Typography classes={classes.timestamp} variant="subtitle1" color="grey">
                {t('notification-headline', { context: groupName })}
              </Typography>
            </div>
            {items.map((item) => (
              <NotificationsListItem
                key={`notification-item-${item.id}`}
                {...item}
                refreshCount={refreshCount}
                onRead={onReadItem}
                onUnread={onUnreadItem}
              />
            ))}
          </Fragment>
        ))
      ) : (
        <div className={classes.noNotificationsBlock}>
          <Typography className="text-grey2 text-center">{t('no-new-notifications')}</Typography>
        </div>
      )}
     </div>)}
      
      {totalCount > notifications.length && (
        <div className={classes.showMore}>
          <Button disabled={isNotificationsLoading} size="medium" onClick={() => onShowMore()}>
            {t('notification-show-more')}
          </Button>
        </div>
      )}
    </div>
  );
};
