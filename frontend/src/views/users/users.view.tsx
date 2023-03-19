import { MainLayout } from 'layouts/main';
import { withAuth } from 'modules/auth/hocs';
import { Breadcrumbs } from 'modules/breadcrumbs/components';
import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { useRouter } from 'modules/common/hooks';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import { useTranslation } from 'next-i18next';
import React, { ReactElement, useEffect } from 'react';
import { UsersTablePartial } from 'views/users/partials';

export const UsersView = withAuth()(
  (): ReactElement => {
    const { t } = useTranslation();
    const breadcrumbs = useRouteBreadcrumbs({ skipLast: 1 });
    const router = useRouter();
    const { query } = router;

    const [userFilter, setUserFilter] = React.useState<UserTableToggleButtonGroupEnum>(
      router.route === 'users'
        ? UserTableToggleButtonGroupEnum.ACTIVE
        : (router.route as UserTableToggleButtonGroupEnum),
    );

    useEffect(() => {
      void router.push({
        route: userFilter,
        query,
      });
    }, [userFilter, router.route]);

    const handleFilterChange = (newUserFilter: UserTableToggleButtonGroupEnum) => {
      setUserFilter(newUserFilter);
    };

    return (
      <MainLayout title={t('title_users')} breadcrumbs={<Breadcrumbs items={breadcrumbs} />}>
        <UsersTablePartial onFilterChange={handleFilterChange} userFilter={userFilter} />
      </MainLayout>
    );
  },
);
