import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { useMemo } from 'react';

type ProfileUpdateFormPartialProps = {
  id: string;
  title: string;
};

export const useUserEditBreadcrumbs = ({ id, title }: ProfileUpdateFormPartialProps): BreadcrumbsItemInterface[] => {
  const routeBreadcrumbs = useRouteBreadcrumbs({ skipLast: 3 });

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
