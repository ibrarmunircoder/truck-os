import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import { useNotificationCategoryPreferencesStyles } from 'modules/notification-preferences/components/notification-category-preferences/notification-category-preferences.styles';
import { NotificationTypePreferences } from 'modules/notification-preferences/components/notification-type-preferences';
import { useNotificationTypeCategory } from 'modules/notification-preferences/hook';
import { NotificationPreferencesTypeCategoryInterface } from 'modules/notification-preferences/notification-preferences.slice';

interface CategoryProps {
  category: NotificationPreferencesTypeCategoryInterface;
}

export const NotificationCategoryPreferences: React.FC<CategoryProps> = (props) => {
  const { category } = props
  const classes = useNotificationCategoryPreferencesStyles(props);
  const { t } = useTranslation();
  const { checkedSwitch, handleSwitchChange } = useNotificationTypeCategory({category})

  return (
    <Grid className={classes.container}>
      <Grid container rowSpacing={2} columnSpacing={3}>
        <Grid className={classes.cardSubtitle} item xs={12}>
          <Typography variant="h5">{t('notification-type-category', { context: category.key })}</Typography>
          <Switch checked={checkedSwitch} onChange={handleSwitchChange} color="secondary" name="checkedSwitch" />
        </Grid>
        {category.notificationTypes?.map((type) => (
          <NotificationTypePreferences key={type.id} notificationType={type} />
        ))}
      </Grid>
      <hr className={classes.divider} />
    </Grid>
  );
};

// TRANSLATION: DO NOT REMOVE
// t('notification-type_user-info') t('notification-type_files-new') t('notification-type_chat-new')
// t('notification-type-category_onboarding') t('notification-type-category_files') t('notification-type-category_chat')
