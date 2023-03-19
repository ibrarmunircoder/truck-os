import { RouteUrlInterface } from 'modules/common/interfaces';
import { ComponentType, ReactNode } from 'react';

export interface MenuItemInterface {
  id: string;
  title: string;
  href?: string | RouteUrlInterface;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps?: Record<string, any>;
  content: ReactNode | (() => ReactNode);
  items?: MenuItemInterface[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
}
