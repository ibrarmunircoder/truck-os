import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { RoqLink } from 'modules/common/components/roq-link';
import { RouteUrlInterface } from 'modules/common/interfaces';
import { resolveValue } from 'modules/common/utils/resolve-value';
import { FunctionComponent, ReactNode } from 'react';

export type HeaderMenuDropdownItemProps = {
  title: string;
  href?: string | RouteUrlInterface;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps?: Record<string, any>;
  content: ReactNode;
};

export const HeaderMenuDropdownItem: FunctionComponent<HeaderMenuDropdownItemProps> = (props) => {
  const { title, href, componentProps = {}, content } = props;

  return (
    <li>
      <MenuItem component={href ? RoqLink : 'div'} {...componentProps} href={href}>
        <ListItemIcon>{resolveValue(content)}</ListItemIcon>
        <ListItemText primary={title} />
      </MenuItem>
    </li>
  );
};
