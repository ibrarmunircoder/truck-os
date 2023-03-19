/* eslint-disable @roq/imports-should-follow-conventions */
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { useSwitchPageBlockStyles } from 'modules/auth/components/switch-page-block/switch-page-block.styles';
import { RoqLink } from 'modules/common/components/roq-link';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';
import routes from 'routes';

type SwitchPageBlockProps = TypographyProps & {
  registered?: boolean;
};
export const SwitchPageBlock: FunctionComponent<SwitchPageBlockProps> = ({ registered, ...props }) => {
  const { t } = useTranslation();
  const classes = useSwitchPageBlockStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      rowSpacing={5}
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h4" mb={1} align="center" {...props} className={classes.heading}>
          {registered ? t('already-registered') : t('not-registered-yet')}{' '}
        </Typography>
      </Grid>

      <Grid item>
        <RoqLink data-cy="create-account-cta" href={{ route: registered ? routes.login : routes.register }}>
          <Button variant="contained" color="secondary" size="large">
            {registered ? t('go-to-login') : t('go-to-registration')}
          </Button>
        </RoqLink>
      </Grid>
    </Grid>
  );
};
