import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dialog, DialogProps } from 'modules/common/components/dialog';
import { useLocales } from 'modules/locale';
import { useLanguagesDialogStyles } from 'modules/locale/components/languages-dialog/languages-dialog.styles';
import { FunctionComponent } from 'react';

export interface LanguagesDialogInterface {
  onClose: DialogProps['onClose'];
}

export const LanguagesDialog: FunctionComponent<LanguagesDialogInterface> = (props) => {
  const { onClose } = props;

  const classes = useLanguagesDialogStyles();
  const { localeOptions, setCurrentLocale } = useLocales();

  return (
    <Dialog title={'Choose language'} onClose={onClose}>
      <List sx={{ p: 0 }}>
        {localeOptions.map((language) => {
          const Flag = language.flag;

          return (
            <ListItem key={language.id} className={classes.listItem} onClick={() => setCurrentLocale(language.id)}>
              <ListItemIcon>
                <Flag className={classes.icon} title={language.label} />
              </ListItemIcon>
              <ListItemText
                primary={language.label}
                primaryTypographyProps={{
                  variant: 'body1',
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
};
