import MoreVertIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import { useHeaderMenu } from 'layouts/main/hooks';
import { useHeaderMenuStyles } from 'layouts/main/partials/header-menu/header-menu.styles';
import { HeaderMenuItem } from 'layouts/main/partials/header-menu-item';
import { useMenuAnchor, useWidth } from 'modules/common/hooks';
import { LanguagesDialog } from 'modules/locale/components/languages-dialog';
import { LanguagesMenu } from 'modules/locale/components/languages-menu';
import {FunctionComponent, useMemo} from 'react';

export type HeaderMenuProps = Record<string, never>;

export const HeaderMenu: FunctionComponent<HeaderMenuProps> = () => {
  const width = useWidth();
  const classes = useHeaderMenuStyles();

  const [anchorEl, onLanguagesOpen, onLanguagesClose] = useMenuAnchor();
  const languagesOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const { toolbarMenuItems, dropdownMenuItems } = useHeaderMenu({
    classes,
    languagesOpen,
    hangleLanguageOpen: onLanguagesOpen,
  });

  // TODO: Refactor it
  return /xs/.test(width)
    ? (
      <>
        <List className={classes.root}>
          <HeaderMenuItem
            title="More"
            componentProps={{
              color: 'inherit',
            }}
            content={<MoreVertIcon/>}
            items={dropdownMenuItems}
          />
        </List>
        {languagesOpen && (
          <LanguagesDialog onClose={onLanguagesClose} />
        )}
      </>
    )
    : (
      <>
        <List className={classes.root}>
          {toolbarMenuItems.map(x => (
            <HeaderMenuItem key={x.id} {...x} />
          ))}
        </List>
        {languagesOpen && (
          <LanguagesMenu anchorEl={anchorEl} onClose={onLanguagesClose} />
        )}
      </>
    )
}
