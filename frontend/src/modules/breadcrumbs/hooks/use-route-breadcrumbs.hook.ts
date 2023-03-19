import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { useMemo } from 'react';

export interface UseRouteBreadcrumbsParams {
  skipLast?: number;
}
export const useRouteBreadcrumbs = ({ skipLast }: UseRouteBreadcrumbsParams = {}): BreadcrumbsItemInterface[] => {
  const router = useRouter();
  const { t } = useTranslation();
  /*
  t('title_home')
  t('title_message-center')
  t('title_profile')
  t('title_files')
  t('title_settings')
  t('title_users')
  t('title_invites')
   */

  return useMemo(() => {
    const pathParts = router.pathname.split('/');
    return (skipLast ? pathParts.slice(0, -skipLast) : pathParts).reduce(
      (acc, name) =>
        acc.concat([
          {
            href: ((acc.length ? acc[acc.length - 1].href : '') + '/' + name).replace('//','/'),
            label: t('title', { context: name || 'home' }),
          },
        ]),
      [],
    )
  }, [ router.pathname, skipLast ]);
};
