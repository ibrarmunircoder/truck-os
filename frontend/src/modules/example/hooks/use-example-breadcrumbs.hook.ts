import { useRouteBreadcrumbs } from 'modules/breadcrumbs/hooks';
import { BreadcrumbsItemInterface } from 'modules/breadcrumbs/interfaces';
import { useRouter } from 'modules/common/hooks';
import { useMemo } from 'react';
import routes from 'routes';

interface IProps {
  skipLast: number;
}

export const useExampleBreadcrumbs = ({ skipLast }: IProps): BreadcrumbsItemInterface[] => {
  const routeBreadcrumbs = useRouteBreadcrumbs({ skipLast });
  const { createPath } = useRouter();

  return useMemo(
    () =>
      routeBreadcrumbs.map((rb) =>
        rb.href === '/example' ? { ...rb, href: createPath({ route: routes.exampleAuthors }) } : rb,
      ),
    [routeBreadcrumbs],
  );
};
