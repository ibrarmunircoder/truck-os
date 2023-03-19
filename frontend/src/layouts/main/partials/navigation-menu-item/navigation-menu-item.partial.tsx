import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useNavigationMenuItemStyles } from 'layouts/main/partials/navigation-menu-item/navigation-menu-item.styles';
import { RoqLink } from 'modules/common/components/roq-link';
import { RouteUrlInterface } from 'modules/common/interfaces';
import { resolveValue } from 'modules/common/utils/resolve-value';
import { useSidebar } from 'modules/layout/hooks';
import { FunctionComponent, ReactElement } from 'react';

export type NavigationMenuItemProps = {
  id: string;
  title: string;
  selected: boolean;
  icon: ReactElement;
  href?: string | RouteUrlInterface;
  key?: string;
};

export const NavigationMenuItem: FunctionComponent<NavigationMenuItemProps> = (props) => {
  const { isOpen: drawerOpen } = useSidebar();

  const { id, title, icon, href, selected } = props;
  const classes = useNavigationMenuItemStyles();

  return (
    <li>
      <Tooltip title={title} placement="right">
        <ListItemButton
          component={RoqLink}
          key={id}
          href={href}
          className={drawerOpen ? classes.listItemExpanded : classes.listItemCollapsed}
          sx={{
            justifyContent: drawerOpen ? 'initial' : 'center',
          }}
          selected={selected}
        >
          <ListItemIcon
            className={drawerOpen ? classes.listItemIconExpanded : classes.listItemIconCollapsed}
            sx={{
              minWidth: 0,
              mr: drawerOpen ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {resolveValue(icon)}
          </ListItemIcon>

          {drawerOpen && (
            <ListItemText
              primary={title}
              classes={{ primary: selected ? classes.listItemPrimaryTextSelected : classes.listItemPrimaryText }}
            />
          )}
        </ListItemButton>
      </Tooltip>
    </li>
  );
};
