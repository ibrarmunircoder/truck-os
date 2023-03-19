import Grid, { GridProps } from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useFooterStyles } from 'layouts/auth/partials/footer/footer.styles';
import { PoweredBy } from 'layouts/auth/partials/powered-by';
import { FooterNavigation } from 'modules/common/components/footer-navigation';
import { useWidth } from 'modules/common/hooks';
import { FunctionComponent } from 'react';

export interface FooterInterface extends GridProps {}

export const Footer: FunctionComponent<FooterInterface> = ({ children }) => {
  const theme = useTheme();
  const classes = useFooterStyles();
  const width = useWidth()

  return (
    <Grid item component="footer" className={classes.root}>
      <div className={classes.content}>{children}</div>
      {/sm|xs/.test(width) && (
        <>
          <PoweredBy classes={classes.poweredBy} themeName={theme.palette.mode}/>
          <FooterNavigation classes={classes.footerNavigation}/>
        </>
      )}
    </Grid>
  );
};
