import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { useTranslation } from 'modules/common/hooks';
import { UserInterface } from 'modules/users/interfaces';
import { shortenUserId } from 'modules/users/util';
import { useMemo } from 'react';
import routes from 'routes';

interface UseProfileBreadcrumbsParamsInterface {
  userId: string;
  editMode: boolean | undefined | null;
  user: UserInterface | undefined | null;
}

export const useProfileBreadcrumbs = ({
  userId,
  user,
  editMode,
}: UseProfileBreadcrumbsParamsInterface): BreadcrumbsItemInterface[] => {
  const { t } = useTranslation();
  const breadcrumbs = useRouteBreadcrumbs({ skipLast: 3 });
  const breadCrumbHref = { route: routes.profile, query: { userId } }; 
  const shortUserId = userId ? shortenUserId(userId) : ``;

  return useMemo(
    () =>
      breadcrumbs.concat([
        {
          label: user ? `${user.firstName} ${user.lastName}` : shortUserId,
          href: breadCrumbHref,
        },
        ...(editMode ? [{ label: t('edit'), href: breadCrumbHref }] : []),
      ]),
    [breadcrumbs, user, editMode, userId],
  );
};
