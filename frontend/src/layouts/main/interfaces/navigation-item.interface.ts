import { RouteUrlInterface } from 'modules/common/interfaces';
import { ReactElement } from 'react';

export interface NavigationItemInterface {
  id: string;
  title: string;
  href?: RouteUrlInterface | string;
  icon: ReactElement;
}
