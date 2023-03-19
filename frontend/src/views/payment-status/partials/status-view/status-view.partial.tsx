import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { useRouter, useTranslation } from 'modules/common/hooks';
import TruckImage from 'modules/common/icons/truck-img.svg';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import routes from 'routes';
import { useStatusViewStyles } from 'views/payment-status/partials/status-view/status-view.styles';

export interface PaymentStatusInterface {
  title: string;
  description: string;
  isDesktop?: boolean;
}

export const StatusViewPartial: FunctionComponent<PaymentStatusInterface> = (props) => {
  const { title, description, isDesktop } = props;
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    void router.push({ route: routes.paymentDashboard });
  };

  const classes = useStatusViewStyles({ isDesktop });
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box className={classes.mainStatusBox}>
          <Box className={classes.truckContentBox}>
            <Box style={{ textAlign: isDesktop ? 'center' : 'left' }}>
              {isDesktop ? (
                <Image
                  className={classes.truckImage}
                  src={'/static/images/truck-full-img.png'}
                  objectFit={'contain'}
                  width={600}
                  height={316}
                  alt="TruckOs Image"
                />
              ) : (
                <TruckImage />
              )}
            </Box>
            <Box className={classes.contentBox}>
              <Typography className={classes.statusHeading}>{title}</Typography>
              <Typography className={classes.statusPragraph}>{description}</Typography>
            </Box>
          </Box>

          <Box className={classes.contentBox}>
            <Button fullWidth variant="contained" onClick={handleClick} className={classes.backButton}>
              {t('payment-status.back-to-dashboard-btn')}
            </Button>
            <Link className={classes.textButton} underline="always" component="button" variant="body2">
              {t('payment-status.contact-service-link')}
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
