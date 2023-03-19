import Grid from '@mui/material/Grid';
import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useTranslation } from 'modules/common/hooks';
import { useProfile, useProfileBreadcrumbs } from 'views/profile/hooks';
import { ProfileUpdateFormPartial } from 'views/profile/partials/profile-update-form/profile-update-form.partial';

export interface ProfileViewProps {
  userId: string;
  editMode?: boolean;
}

export const ProfileView = withAuth<ProfileViewProps>()(({ userId, editMode }) => {
  const { t } = useTranslation();
  const { user } = useProfile(userId);

  const breadcrumbs = useProfileBreadcrumbs({ userId, user, editMode });

  return (
    <MainLayout title={t('title_profile')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
      <Grid container item xs={12}>
        <Grid item xs={12}>
          {user && <ProfileUpdateFormPartial user={user} editMode={editMode} />}
        </Grid>
      </Grid>
    </MainLayout>
  );
});
