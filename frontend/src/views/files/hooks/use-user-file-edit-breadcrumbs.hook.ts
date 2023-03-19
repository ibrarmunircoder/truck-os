import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { useMemo } from 'react';

interface UseUserFileEditBreadcrumbsPropsInterface {
  id: string;
  title: string;
};

export const useUserFileEditBreadcrumbs = ({
  id,
  title
}: UseUserFileEditBreadcrumbsPropsInterface): BreadcrumbsItemInterface[] => {
  const routeBreadcrumbs = useRouteBreadcrumbs({ skipLast: 2 });

  return useMemo(
    () =>
      routeBreadcrumbs.concat([
        {
          href: `${id}`,
          label: title,
          translate: false,
        },
      ]),
    [routeBreadcrumbs, id, title],
  );
};
