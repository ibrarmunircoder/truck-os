import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { MenuItemInterface } from 'layouts/main/interfaces';
import { HeaderMenuDropdownItem } from 'layouts/main/partials/header-menu-dropdown-item';
import { HeaderMenuDropdownItemGroup } from 'layouts/main/partials/header-menu-dropdown-item-group';
import { useHeaderMenuItemStyles } from 'layouts/main/partials/header-menu-item/header-menu-item.styles';
import { useMenuAnchor, useRouter } from 'modules/common/hooks';
import { RouteUrlInterface } from 'modules/common/interfaces';
import { resolveValue } from 'modules/common/utils/resolve-value';
import NextLink from 'next/link';
import { ComponentType, FunctionComponent, ReactNode, useMemo } from 'react';

export type HeaderMenuItemProps = {
  title: string;
  href?: string | RouteUrlInterface;
  component?: ComponentType<{ href?: string | RouteUrlInterface }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentProps?: Record<string, any>;
  content: ReactNode;
  items?: MenuItemInterface[];
};

// TODO: refactor rendering menu items
export const HeaderMenuItem: FunctionComponent<HeaderMenuItemProps> = (props) => {
  const { title, href, component: Component, componentProps = {}, content, items = [] } = props;

  const classes = useHeaderMenuItemStyles();
  const { createPath } = useRouter();
  const [anchorEl, onMenuOpen, onMenuClose] = useMenuAnchor();
  const menuOpen = Boolean(anchorEl);

  const itemContent = useMemo(() => {
    if (Component) {
      return (
        <Component href={href} {...componentProps}>
          {resolveValue(content)}
        </Component>
      );
    }

    const iconButton = (
      <Tooltip
        title={title}
        PopperProps={{
          className: menuOpen ? classes.displayNone : '',
        }}
      >
        <IconButton
          {...componentProps}
          component={href ? 'a' : 'button'}
          onClick={items.length > 0 ? onMenuOpen : componentProps.onClick}
        >
          {resolveValue(content)}
        </IconButton>
      </Tooltip>
    );

    return href ? (
      <NextLink href={createPath(href)} passHref>
        {iconButton}
      </NextLink>
    ) : (
      iconButton
    );
  }, [Component, componentProps, content, onMenuOpen, href, menuOpen]);

  return (
    <>
      <ListItem className={classes.listItem}>{itemContent}</ListItem>
      {items && (
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={onMenuClose}
          onClick={onMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {items.map((x, i) =>
            x.items?.length ? (
              <HeaderMenuDropdownItemGroup key={x.id} after={!items[i]}>
                {x.items.map((y) => (
                  <HeaderMenuDropdownItem key={y.id} {...y} />
                ))}
              </HeaderMenuDropdownItemGroup>
            ) : (
              <HeaderMenuDropdownItem key={x.id} {...x} />
            ),
          )}
        </Menu>
      )}
    </>
  );
};
