import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import { NotificationCategoryPreferences } from 'modules/notification-preferences/components/notification-category-preferences';
import { useNotificationPreferencesStyles } from 'modules/notification-preferences/components/notification-preferences/notification-preferences.styles';
import { useNotificationsCategoriesLoader } from 'modules/notification-preferences/hook';
import { notificationPreferencesSelector } from 'modules/notification-preferences/selector';
import { useSelector } from 'react-redux';

export const NotificationPreferences: React.FC = (props) => {
  useNotificationsCategoriesLoader();
  const { categories = [] } = useSelector(notificationPreferencesSelector) || {};

  const classes = useNotificationPreferencesStyles(props);
  const { t } = useTranslation();

  return (
    <Card classes={classes.card} raised>
      <CardHeader
        classes={classes.cardHeader}
        title={<Typography variant="h3"> {t('notification-preferences-title')}</Typography>}
      />
      <CardContent classes={classes.cardContent}>
        {categories.map((category) => (
          <NotificationCategoryPreferences key={category.id} category={category} />
        ))}
      </CardContent>
    </Card>
  );
};
