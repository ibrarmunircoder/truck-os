import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { RoqLink, RoqLinkInterface } from 'modules/common/components/roq-link';
import { useLanguageLinkStyles } from 'modules/locale/components/language-link/language-link.styles';
import { forwardRef } from 'react';

export type LanguageLinkProps = {
  open: boolean;
  inheritColor?: boolean;
} & RoqLinkInterface;

export const LanguageLink = forwardRef<HTMLAnchorElement, LanguageLinkProps>((props, ref) => {
  const { children, open, ...other } = props;

  const classes = useLanguageLinkStyles(other);

  return (
    <RoqLink data-cy="language-link" ref={ref} {...other} className={classes.root}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>{children}</Grid>
        <Grid item>
          <Box paddingTop={1}>{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Box>
        </Grid>
      </Grid>
    </RoqLink>
  );
});

LanguageLink.displayName = 'LanguageLink';
