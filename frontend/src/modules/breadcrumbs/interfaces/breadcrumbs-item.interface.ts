import { RouteUrlInterface } from "modules/common/interfaces";

export interface BreadcrumbsItemInterface {
  label: string;
  href: string | RouteUrlInterface;
  translate?: boolean;
}
